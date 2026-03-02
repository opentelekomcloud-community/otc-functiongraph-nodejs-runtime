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

const {loadFunction, processInvoke, initializeFunction, initRuntimeHandler} = require('../runtimeHandler');
const rpcMessage = require('../pb/rpc_pb.js');
const childProcess = require('child_process');
const runtimeError = require('../error.js');
const {preLoadFunction} = require('./common');
const Server = require('../server.js');


const WHITE_SPACE_LENGTH = 4;

childProcess.execSync('mkdir -p /opt/function/code');
childProcess.execSync('cp ./test/functions/*.js /opt/function/code');

test('test initRuntimeHandler', () => {
  const rpcServer = new Server.RPCServer();
  expect(rpcServer).toBeTruthy();
  initRuntimeHandler(rpcServer)
});

test('loadFunction', () => {
  const request = new rpcMessage.LoadRequest();
  request.setEntry('/opt/function/code/index.js');
  request.setFuncname('handler');
  const expectRequest = new rpcMessage.LoadResponse()
  loadFunction((actualResponse) => {
    expect(actualResponse).toStrictEqual(expectRequest);
  }, request);
});

const invoke_tests = [
  {
    name: 'processInvoke',
    entry: '/opt/function/code/index.js',
    handler: 'handler',
    expectResult: {
      'statusCode': 200,
      'headers':
        {
          'Content-Type': 'application/json'
        },
      'isBase64Encoded': false,
      'body': '{"key":"value"}',
    },
    expectErrorCode: null,
    expectErrorMessage: null
  },
  {
    name: 'processInvoke module not exists',
    entry: '/opt/function/code/notExists.js',
    handler: 'handler',
    expectResult: null,
    expectErrorCode: runtimeError.FUNCTION_ENTRY_EXCEPTION.code,
    expectErrorMessage: {
      "errorMessage": "function entry exception, error: not found module './notExists.js'",
      "errorType": "FunctionLoadError"
    }
  },
  {
    name: 'processInvoke handler not exists',
    entry: '/opt/function/code/index.js',
    handler: 'notExists',
    expectResult: null,
    expectErrorCode: runtimeError.FUNCTION_ENTRY_EXCEPTION.code,
    expectErrorMessage: {
      "errorMessage": "function entry exception, error: handler 'notExists' not found in module './index.js'",
      "errorType": "FunctionConfigError"
    },
  },
  {
    name: 'processInvoke UserFunctionError',
    entry: '/opt/function/code/userFunctionError.js',
    handler: 'handler',
    expectResult: null,
    expectErrorCode: runtimeError.USER_FUNCTION_EXCEPTION.code,
    expectErrorMessage: {
      "errorMessage": "function invocation exception, error: Something bad happened!",
      "errorType": "Error",
      "stackTrace": [
        "at Object.<anonymous>.exports.handler (./userFunctionError.js:17:11)"
      ]
    }
  },
  {
    name: 'processInvoke syntax error',
    entry: '/opt/function/code/syntaxError.js',
    handler: 'handler',
    expectResult: null,
    expectErrorCode: runtimeError.USER_FUNCTION_EXCEPTION.code,
    expectErrorMessage: {
      "errorMessage": "function invocation exception, error: output is not defined",
      "errorType": "ReferenceError",
      "stackTrace": [
        "at Object.<anonymous>.exports.handler (./syntaxError.js:18:5)"
      ]
    }
  },
  {
    name: 'too big result',
    entry: '/opt/function/code/tooBigResult.js',
    handler: 'handler',
    expectResult: null,
    expectErrorCode: runtimeError.USER_RETURN_VALUE_TOO_LARGE.code,
    expectErrorMessage: runtimeError.USER_RETURN_VALUE_TOO_LARGE.message
  },
  {
    name: 'function result invalid',
    entry: '/opt/function/code/resultInvalid.js',
    handler: 'handler',
    expectResult: null,
    expectErrorCode: runtimeError.SYSTEM_CONVERT_JSON.code,
    expectErrorMessage: {
      "errorMessage": "function result is invalid, error: Converting circular structure to JSON",
      "errorType": "TypeError",
    }
  },
];

describe('test invoke', () => {
  for(let i = 0; i < invoke_tests.length; i++){
    it(invoke_tests[i].name, () => {
      preLoadFunction(invoke_tests[i].entry, invoke_tests[i].handler, [])
      const request = new rpcMessage.InvokeRequest();
      request.setEvent(Buffer.from('{"key":"value"}'));

      const expectResponse = new rpcMessage.InvokeResponse();
      if (invoke_tests[i].expectResult !== null) {
        const serializedResult = Buffer.from(JSON.stringify(invoke_tests[i].expectResult));
        expectResponse.setResult(serializedResult);
      } else {
        const pbError = new rpcMessage.Error();
        pbError.setCode(invoke_tests[i].expectErrorCode);
        pbError.setMessage(JSON.stringify(invoke_tests[i].expectErrorMessage, null, WHITE_SPACE_LENGTH));
        expectResponse.setError(pbError);
      }
      processInvoke((actualResponse) => {
        expect(actualResponse).toStrictEqual(expectResponse);
      }, request);
    });
  }
});

const initialize_tests = [
  {
    name: 'initialize successfully',
    funcEnvList : ['func-RUNTIME_INITIALIZER_HANDLER=index.initializer'],
    entry: '/opt/function/code/index.js',
    handler: 'handler',
    expectErrorCode: null,
    expectErrorMessage: null
  },
  {
    name: 'initialize module not exists',
    funcEnvList : ['func-RUNTIME_INITIALIZER_HANDLER=notExists.initializer'],
    entry: '/opt/function/code/notExists.js',
    handler: 'handler',
    expectErrorCode: runtimeError.USER_INITIALIZATION_FUNCTION_EXCEPTION.code,
    expectErrorMessage: {
      "errorMessage": "function initialization exception, error: not found module './notExists.js'",
      "errorType": "FunctionLoadError",
    }
  },
  {
    name: 'initialize method not exists',
    funcEnvList : ['func-RUNTIME_INITIALIZER_HANDLER=index.notExists'],
    entry: '/opt/function/code/index.js',
    handler: 'notExists',
    expectErrorCode: runtimeError.USER_INITIALIZATION_FUNCTION_EXCEPTION.code,
    expectErrorMessage: {
      "errorMessage": "function initialization exception, error: initializer 'notExists' not found in module './index.js'",
      "errorType": "FunctionConfigError"
    },
  },
  {
    name: 'initialize syntax error',
    funcEnvList : ['func-RUNTIME_INITIALIZER_HANDLER=index.initializer'],
    entry: '/opt/function/code/syntaxError.js',
    handler: 'handler',
    expectErrorCode: runtimeError.USER_INITIALIZATION_FUNCTION_EXCEPTION.code,
    expectErrorMessage: {
      "errorMessage": "function initialization exception, error: Something bad happened!",
      "errorType": "Error",
      "stackTrace": [
        "at Object.<anonymous>.exports.initializer (./syntaxError.js:22:11)"
      ]
    }
  }
];

describe('test initialize', () => {
  for(let i = 0; i < initialize_tests.length; i++){
    it(initialize_tests[i].name, () => {
      preLoadFunction(initialize_tests[i].entry, initialize_tests[i].handler, initialize_tests[i].funcEnvList)
      const request = new rpcMessage.InitializerRequest();
      const expectResponse = new rpcMessage.InitializerResponse();
      if (initialize_tests[i].expectErrorCode !== null) {
        const pbError = new rpcMessage.Error();
        pbError.setCode(initialize_tests[i].expectErrorCode);
        pbError.setMessage(JSON.stringify(initialize_tests[i].expectErrorMessage, null, WHITE_SPACE_LENGTH));
        expectResponse.setError(pbError);
      }
      initializeFunction((actualResponse) => {
        expect(actualResponse).toStrictEqual(expectResponse);
      }, request);
    });
  }
});

const tests = [
  {
    name: "handler args should be 2 or 3",
    entry: '/opt/function/code/index.js',
    handler: 'oneArgsError',
    expectErrorCode: runtimeError.FUNCTION_ENTRY_EXCEPTION.code,
    expectErrorMessage: {
      "errorMessage": "function entry exception, error: handler expect to have 2 or 3 parameters, but received 1",
      "errorType": "FunctionLoadError",
    }
  },
  {
    name: "handler args should be 2 or 3",
    entry: '/opt/function/code/index.js',
    handler: 'fourArgsError',
    expectErrorCode: runtimeError.FUNCTION_ENTRY_EXCEPTION.code,
    expectErrorMessage: {
      "errorMessage": "function entry exception, error: handler expect to have 2 or 3 parameters, but received 4",
      "errorType": "FunctionLoadError",
    }
  },
];

describe('test handler args', () => {
  for (let i = 0; i < tests.length; i++) {
    it(tests[i].name, () => {
      preLoadFunction(tests[i].entry, tests[i].handler, [])
      const request = new rpcMessage.InvokeRequest();
      request.setEvent(Buffer.from('{"key":"value"}'));
      const expectResponse = new rpcMessage.InvokeResponse();
      const pbError = new rpcMessage.Error();
      pbError.setCode(tests[i].expectErrorCode);
      pbError.setMessage(JSON.stringify(tests[i].expectErrorMessage, null, WHITE_SPACE_LENGTH));
      expectResponse.setError(pbError);
      processInvoke((actualResponse) => {
        expect(actualResponse).toStrictEqual(expectResponse);
      }, request);
    });
  }
});

test('initializer args error', () => {
  const funcEnvList = ['func-RUNTIME_INITIALIZER_HANDLER=index.initializerArgsError']
  preLoadFunction('/opt/function/code/index.js', 'handler', funcEnvList)
  const request = new rpcMessage.InitializerRequest();
  const expectResponse = new rpcMessage.InitializerResponse();
  const pbError = new rpcMessage.Error();
  pbError.setCode(runtimeError.USER_INITIALIZATION_FUNCTION_EXCEPTION.code);
  const errorMessage = {
    "errorMessage": "function initialization exception, error: initializer expect to have 2 parameters, but received 1",
    "errorType": "FunctionConfigError",
  }
  pbError.setMessage(JSON.stringify(errorMessage, null, WHITE_SPACE_LENGTH));
  expectResponse.setError(pbError);
  initializeFunction((actualResponse) => {
    expect(actualResponse).toStrictEqual(expectResponse);
  }, request);
});

test('initializeFunction without preLoadFunction', () => {
  const funcEnvList = ['func-RUNTIME_INITIALIZER_HANDLER=index.']
  preLoadFunction('/opt/function/code/index.js', 'handler', funcEnvList)
  const request = new rpcMessage.InitializerRequest();
  const expectResponse = new rpcMessage.InitializerResponse();
  initializeFunction((actualResponse) => {
    expect(actualResponse).toStrictEqual(expectResponse);
  }, request);
});
