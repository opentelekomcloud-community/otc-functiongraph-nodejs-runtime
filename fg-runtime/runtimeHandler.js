/*
 * Copyright (c) 2021 Huawei Technologies Co., Ltd
 *
 * This software is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *
 * http://license.coscl.org.cn/MulanPSL2
 *
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

const rpcMessage = require('./pb/rpc_pb.js'),
  stateEvent = require('./pb/stateful_event_pb.js'),
  runtimeError = require('./error.js'),
  { Logger, redirectStdout, setLoggerServer } = require('./logger'),
  { logger } = require('./connect/message'),
  { Context } = require('./context'),
  errorHandler = require('./errorHandler'),
  { recover, getFunctionEnvList, deleteLoadingCache, getRespBodySize } = require('./utils'),
  maxRequestBodySize = process.env.MAX_REQUEST_BODY_SIZE,
  functionSDK = require('functionsdk'),
  util = require('util'),

  traceAK = 'FAAS_TRACE_AK',
  traceSK = 'FAAS_TRACE_SK',
  masterAddress = 'MASTER_ADDRESS',
  region = 'FAAS_PROJECT_NAME',
  NODE_VERSION = process.env.NODE_VERSION || '10',
  { FunctionLoadError, FunctionConfigError, UserFunctionError,
    FunctionError, newError, ErrorWithCode } = errorHandler,
  MEGABYTES = 1048576,
  funcEnv = {},
  callEvents = functionSDK.funcCallEvents,
  initializersLength = 2,
  initializerArgsNumLimit = 2,
  handlerArgsMinNum = 2,
  handlerArgsMaxNum = 3;

let handlerPath = '';
let handlerName = '';
let agent = null;
let traceEnable = (NODE_VERSION === '14');
let initializerMethod = '';
let resetRequestBodySize = maxRequestBodySize;

try {
  agent = require('@cloud/nodejs-agent');
} catch (err) {
  traceEnable = false;
}

function generateFuncResponse(errCode, errMsg) {
  return new functionSDK.FuncResponse({
    // Do not change keys, upper will read them.
    errCode,
    message: errMsg,
  });
}

function initRuntimeHandler(server) {
  setLoggerServer(server)
  redirectStdout()
  callEvents.on('request', (request) => {
    const callRequest = new rpcMessage.CallRequest();
    callRequest.setDestination(request.to);
    callRequest.setEvent(Buffer.from(request.request));
    callRequest.setInvokeid(request.eventID);
    callRequest.setTraceid(request.traceID);
    callRequest.setTimeout(request.timeout);
    request.destAttr && callRequest.setDestattribute(request.destAttr);

    logger.debug(`started to call function ${request.to}`);
    server.processCall((err, callResponse) => {
      if (err !== null) {
        logger.error(`failed to call function ${request.to}`);
        const errMsg = `${err.CALL_FUNCTION_EXCEPTION.message} ${err}`,
          resp = generateFuncResponse(err.CALL_FUNCTION_EXCEPTION.code, errMsg);
        callEvents.emit(request.messageID, resp);
        return;
      }
      if (callResponse.hasError()) {
        logger.warn(`calling function ${request.to} response err`);
        const responseError = callResponse.getError();
        callEvents.emit(request.messageID, generateFuncResponse(responseError.getCode(), responseError.getMessage()));
      } else {
        logger.debug(`started to call function ${request.to} response content`);
        callEvents.emit(request.messageID, new functionSDK.FuncResponse(null, callResponse.getResult_asU8()));
      }
    }, callRequest);
  });
}

function loadFunction(callback, request) {
  handlerPath = request.getEntry();
  handlerName = request.getFuncname();
  logger.info(`load function, handlerPath=${handlerPath} handlerName=${handlerName} node version :${NODE_VERSION}`);
  // init env only once when loadFunc, for envs are not changed
  getFunctionEnvList(request, funcEnv);
  const envValue = process.env.MAX_REQUEST_BODY_SIZE;
  if (envValue) {
    resetRequestBodySize = parseInt(envValue, 10);
  }
  funcEnv.RUNTIME_MAX_RESP_BODY_SIZE = parseInt(resetRequestBodySize * MEGABYTES);
  process.env.RUNTIME_MAX_RESP_BODY_SIZE = parseInt(resetRequestBodySize * MEGABYTES);

  const initializerHandler = funcEnv.RUNTIME_INITIALIZER_HANDLER;
  if (typeof initializerHandler !== 'undefined' && initializerHandler && initializerHandler !== '') {
    const initializers = initializerHandler.split('.');
    if (initializers.length === initializersLength) {
      [_,
        initializerMethod] = initializers
    }
  }
  logger.debug('get user config');
  handlerPath = deleteLoadingCache(handlerPath);
  logger.debug('delete cache finish');
  callback(new rpcMessage.LoadResponse());
}

function createContext(request = {}) {
  const requestID = request.getTraceid(),
    invokeID = request.getInvokeid(),
    extra = request.getExtraMap(),
    opts = {
      requestID,
      invokeID,
      funcEnv,
      accessKey: extra.get('x-access-key') || '',
      secretKey: extra.get('x-secret-key') || '',
      securityAccessKey: extra.get('x-security-access-key') || '',
      securitySecretKey: extra.get('x-security-secret-key') || '',
      workflowID: extra.get('x-workflow-id') || '',
      workflowRunID: extra.get('x-workflow-run-id') || '',
      workflowStateID: extra.get('x-workflow-state-id') || '',
      authToken: extra.get('x-auth-token') || '',
      securityToken: extra.get('x-security-token') || '',
      alias: extra.get('x-invoke-alias') || '',
      logger: new Logger(requestID, invokeID),
    };

  return new Context(opts);
}

// recover writes error response to rpc client
function recoverInitializer(callback, errInfo) {
  const pbError = new rpcMessage.Error(),
    response = new rpcMessage.InitializerResponse();

  pbError.setCode(errInfo.code);
  pbError.setMessage(errInfo.message);

  response.setError(pbError);
  callback(response);
  logger.warn('Write initializer error response to rpc client successfully');
}

function getRespMessage(failed = false, msg = '', options = {}) {
  let response = {};
  if (failed) {
    if (msg instanceof Error) {
      response = errorHandler.getErrorMsg(msg);
    } else {
      if (typeof msg === 'object'){
        response = JSON.stringify(msg);
      } else {
        response = String(msg);
      }
    }
  } else {
    response = msg;
  }

  if (typeof response === 'object') {
    return JSON.stringify(response)
  }
  return String(response);
}

function getInitInstance(callback) {
  let module = null;
  try {
    module = require(handlerPath);
  } catch (err) {
    const errMessage = err.message;
    if (errMessage.indexOf(handlerPath) >= 0) {
      // File Not Found
      callback(new FunctionLoadError(`not found module '${handlerPath}'`), null);
    } else {
      // SyntaxError In Static
      callback(new FunctionLoadError(err), null);
    }
    return null;
  }
  if (!module) {
    callback(new FunctionLoadError(`not found module '${handlerPath}'`), null);
    return null;
  }
  const initializerInstance = module[initializerMethod];
  if (!initializerInstance) {
    callback(new FunctionConfigError(`initializer '${initializerMethod}' not found in module '${handlerPath}'`), null);
    return null;
  }
  const argsNum = initializerInstance.length;
  if (argsNum !== initializerArgsNumLimit) {
    const msg = `initializer expect to have ${initializerArgsNumLimit} parameters, but received ${argsNum}`;
    callback(new FunctionConfigError(msg), null);
    return null;
  }
  return initializerInstance;
}

function runInitFuncIns(funcInstance, context, callback) {
  switch (NODE_VERSION) {
    case '6': {
      // User Function, (e, c, cb) => { cb(); }
      funcInstance(context, callback);
      break;
    }
    case '8':
    case '10':
    case '12':
    case '14':
    case '16':
    case '18':
    case '20': {
      const result = funcInstance(context, callback);
      if (result instanceof Promise) {
        // User Function, async (e, c, cb?) => { return; }
        result.then((data) => {
          callback(null, null);
        }).catch((error) => {
          // return user function error
          callback(new UserFunctionError(error), null);
        });
      }
      break;
    }
    default: {
      callback('System error, invalid Node.js version.', null);
    }
  }
}

function callInitHandler(callback, context) {
  const initializerInstance = getInitInstance(callback);
  if (!initializerInstance) {
    return;
  }
  try {
    runInitFuncIns(initializerInstance, context, callback);
  } catch (err) {
    // Function Runtime Error
    callback(new UserFunctionError(err), null);
  }
}

function initializeFunction(writer, request) {
  const response = new rpcMessage.InitializerResponse();
  if (typeof initializerMethod === undefined || !initializerMethod || initializerMethod === '') {
    writer(response);
    return;
  }
  logger.debug('initialized Function start');
  let context = null,
    HasCallBacked = false;

  const requestID = request.getTraceid(),
    extra = request.getExtraMap(),
    opts = {
      funcEnv,
      accessKey: extra.get('x-access-key') || '',
      secretKey: extra.get('x-secret-key') || '',
      securityAccessKey: extra.get('x-security-access-key') || '',
      securitySecretKey: extra.get('x-security-secret-key') || '',
      workflowID: extra.get('x-workflow-id') || '',
      workflowRunID: extra.get('x-workflow-run-id') || '',
      workflowStateID: extra.get('x-workflow-state-id') || '',
      authToken: extra.get('x-auth-token') || '',
      securityToken: extra.get('x-security-token') || '',
      alias: extra.get('x-invoke-alias') || '',
      logger: new Logger(requestID, 'initializer'),
    };
  context = new Context(opts);

  function callback(error = {}, data= '') {
    // Prevent multiple callbacks.
    if (HasCallBacked) {
      return;
    }
    HasCallBacked = true;
    if (error) {
      context.getLogger().error(errorHandler.buildErrMessage(error));
      const tmpError = error;
      tmpError.message = runtimeError.USER_INITIALIZATION_FUNCTION_EXCEPTION.message + error.message;
      const message = getRespMessage(true, tmpError);
      const err = new FunctionError(runtimeError.USER_INITIALIZATION_FUNCTION_EXCEPTION.code, message);
      recoverInitializer(writer, err);
      return;
    }

    writer(response);
  }

  callInitHandler(callback, context);
}

function writeError(context, error, writer) {
  context.getLogger().error(errorHandler.buildErrMessage(error));
  const tmpError = error;
  if (error instanceof UserFunctionError) {
    tmpError.message = runtimeError.USER_FUNCTION_EXCEPTION.message + error.message
    const respMessage = getRespMessage(true, tmpError);
    let errorInfo = null;
    if (error.code) {
      errorInfo = new FunctionError(error.code, respMessage);
    } else {
      errorInfo = new FunctionError(runtimeError.USER_FUNCTION_EXCEPTION.code, respMessage);
    }
    recover(writer, errorInfo);
    return;
  }
  tmpError.message = runtimeError.FUNCTION_ENTRY_EXCEPTION.message + error.message
  const respMessage = getRespMessage(true, tmpError);
  const errorInfo = new FunctionError(runtimeError.FUNCTION_ENTRY_EXCEPTION.code, respMessage);
  recover(writer, errorInfo);
}

function checkFuncInstanceArgs(argsNum) {
  if (NODE_VERSION === '6') {
    if (argsNum !== handlerArgsMaxNum) {
      const msg = `handler expect to have ${handlerArgsMaxNum} parameters, but received ${argsNum}`;
      return new FunctionLoadError(msg);
    }
  } else {
    if (!(argsNum === handlerArgsMaxNum || argsNum === handlerArgsMinNum)) {
      const msg =
        `handler expect to have ${handlerArgsMinNum} or ${handlerArgsMaxNum} parameters, but received ${argsNum}`;
      return new FunctionLoadError(msg);
    }
  }
  return null;
}

function getFuncInstance(callback) {
  let module = null;
  try {
    // require method will check user function for syntax errors
    module = require(handlerPath);
  } catch (err) {
    // File Not Found or SyntaxError In Static
    const errMessage = err.message;
    if (errMessage.indexOf('Cannot find module') >= 0 &&
        errMessage.indexOf(`Cannot find module '${handlerPath}'`) < 0) {
      callback(new FunctionLoadError(err), null);
    } else if (errMessage.indexOf(handlerPath) >= 0) {
      // File Not Found
      callback(new FunctionLoadError(`not found module '${handlerPath}'`), null);
    } else {
      // SyntaxError In Static
      callback(new FunctionLoadError(err), null);
    }
    return null;
  }
  const funcInstance = module[handlerName];
  if (!funcInstance) {
    callback(new FunctionConfigError(`handler '${handlerName}' not found in module '${handlerPath}'`), null);
    return null;
  }
  const error = checkFuncInstanceArgs(funcInstance.length);
  if (error !== null) {
    callback(error, null);
    return null;
  }
  return funcInstance;
}

function runFuncByTrace(funcInstance, event, context, callback) {
  if (funcInstance.constructor.name === 'AsyncFunction') {
    agent.start({
      AK: funcEnv[traceAK],
      SK: funcEnv[traceSK],
      masterAddress: process.env[masterAddress],
      appName: process.env['RUNTIME_FUNC_NAME']+ '_' + process.env['RUNTIME_FUNC_VERSION'],
      env: funcEnv[region],
      logFilePath: '/tmp',
      metricInterval: 3000,
    }).then(()=>{
      funcInstance = agent.huaweiFunctiongraphWrap(funcInstance)
      funcInstance(event, context, callback)
        .then((result) => {
          callback(null, result);
        })
        .catch((err) => {
          callback(new UserFunctionError(err), null);
        });
    });
  } else {
    funcInstance(event, context, callback);
  }
}

function runFuncInstance(funcInstance, event, context, callback) {
  if (traceEnable && funcEnv[traceAK]){
    runFuncByTrace(funcInstance, event, context, callback)
    return
  }
  switch (NODE_VERSION) {
    case '6': {
      // User Function, (e, c, cb) => { cb(); }
      funcInstance(event, context, callback);
      break;
    }
    case '8':
    case '10':
    case '12':
    case '14':
    case '16':
    case '18':
    case '20': {
      const result = funcInstance(event, context, callback);
      if (result instanceof Promise) {
        // User Function, async (e, c, cb?) => { return; }
        result.then((data) => {
          callback(null, data);
        }).catch((err) => {
          // return user function error
          callback(new UserFunctionError(err), null);
        });
      }
      break;
    }
    default: {
      callback('System error, invalid Node.js version.', null);
    }
  }
}

function callHandler(callback, event, context) {
  const funcInstance = getFuncInstance(callback);
  if (!funcInstance) {
    return;
  }

  try {
    runFuncInstance(funcInstance, event, context, callback);
  } catch (err) {
    // Function Runtime Error
    callback(new UserFunctionError(err), null);
  }
}

function initState(event, context) {
  let module = null;
  try {
    module = require(handlerPath);
  } catch (err) {
    // File Not Found or SyntaxError In Static
    const errMessage = err.message;
    if (errMessage.indexOf(handlerPath) >= 0) {
      // File Not Found
      throw new FunctionLoadError(`not found module '${handlerPath}'`);
    } else {
      // SyntaxError In Static
      throw new FunctionLoadError(err);
    }
  }

  if (typeof module.initState !== 'function') {
    throw new FunctionLoadError('initState function is not exist');
  }
  try {
    module.initState(event, context);
  } catch (err) {
    throw new UserFunctionError(err);
  }
  if (context.state === undefined || context.state === null) {
    throw new UserFunctionError('state is undefined');
  }
}

/*
 * If there is a serialized state, deserialize it,
 * otherwise, obtain the user's initial state.
 */
function parseState(serializedState) {
  if (serializedState !== null && serializedState !== '') {
    return JSON.parse(serializedState);
  }
  return null;
}

function parseRequest(request) {
  const context = createContext(request);
  let serializedEvent = null;
  let stateInfo = null;
  // Check whether the request is from the "functionTask"
  try {
    const realEvent = stateEvent.StatefulEvent.deserializeBinary(request.getEvent());
    serializedEvent = realEvent.getEvent_asU8();
    stateInfo = realEvent.getState();
    context.invokeProperty = realEvent.getProperty();
    context.fromTask = true;
    logger.debug('may be stateful invoke event');
  } catch (e) {
    logger.debug('normal invoke event');
    serializedEvent = request.getEvent_asU8();
  }

  let event = null;
  try {
    event = JSON.parse(Buffer.from(serializedEvent).toString());
  } catch (err) {
    throw new ErrorWithCode(runtimeError.USER_FUNCTION_EXCEPTION.code, err.message);
  }

  // Unmarshal use's state by json
  if (stateInfo !== null && stateInfo.getId() !== '') {
    context.instanceID = stateInfo.getId();
    const serializedState = stateInfo.getContent();
    try {
      const state = parseState(serializedState, event, context);
      if (state !== null) {
        context.state = state;
      } else {
        initState(event, context);
      }
    } catch (err) {
      logger.error(`failed to parse the state, error: ${err.message}`);
      err.message = runtimeError.USER_STATE_UNDEFINED.message + err.message
      const respMessage = getRespMessage(true, err);
      throw new ErrorWithCode(runtimeError.USER_STATE_UNDEFINED.code, respMessage);
    }
  }

  return {
    context,
    event,
  };
}

function getSerializedResult(context, data) {
  let serializedResult = null;
  try {
    serializedResult = Buffer.from(getRespMessage(false, data));
  } catch (err) {
    err.message = runtimeError.SYSTEM_CONVERT_JSON.message + err.message
    const respMessage = getRespMessage(true, err);
    throw new ErrorWithCode(runtimeError.SYSTEM_CONVERT_JSON.code, respMessage);
  }
  // Check if return value is out of range limited size
  if (serializedResult.length > resetRequestBodySize * MEGABYTES) {
    const limit = resetRequestBodySize * MEGABYTES;
    const errMessage = util.format('response body size %d exceeds the limit of %d', serializedResult.length, limit);
    throw new ErrorWithCode(runtimeError.USER_RETURN_VALUE_TOO_LARGE.code, errMessage);
  }

  // Check whether the request is sent to the functionTask
  if (context.fromTask) {
    const reformatResult = new stateEvent.StatefulResult();
    reformatResult.setResult(serializedResult);
    reformatResult.setProperty(context.invokeProperty);
    serializedResult = reformatResult.serializeBinary();
  }
  return serializedResult;
}

function processInvoke(writer, request) {
  logger.debug(`process invoke, invokeID ${request.getInvokeid()}`);
  let requestInfo = null;
  try {
    requestInfo = parseRequest(request);
  } catch (err) {
    recover(writer, newError(err));
    return;
  }

  let HasCallBacked = false;

  function callback(error = {}, data= '') {
    // Prevent multiple callbacks.
    if (HasCallBacked) {
      return;
    }
    HasCallBacked = true;
    const response = new rpcMessage.InvokeResponse();
    if (error) {
      writeError(requestInfo.context, error, writer);
      return;
    }
    let serializedResult = null;
    try {
      serializedResult = getSerializedResult(requestInfo.context, data);
    } catch (err) {
      recover(writer, newError(err));
      return;
    }
    response.setResult(serializedResult);
    writer(response);
  }

  callHandler(callback, requestInfo.event, requestInfo.context);
}

module.exports = { processInvoke, loadFunction, initializeFunction, initRuntimeHandler };