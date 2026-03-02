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

const rpcMessage = require('./pb/rpc_pb.js');
const { logger } = require('./connect/message');
const maxRequestBodySize = process.env.MAX_REQUEST_BODY_SIZE;

const MEGABYTES = 1024 * 1024;

// recover writes error response to rpc client
function recover(callback, errInfo) {
  const pbError = new rpcMessage.Error();
  pbError.setCode(errInfo.code);
  pbError.setMessage(errInfo.message);

  const response = new rpcMessage.InvokeResponse();
  response.setError(pbError);
  callback(response);
  logger.warn('Write error response to rpc client successfully');
}

function putEnvToFunc(funcEnv, list) {
  const funcLength = 'func-'.length;
  list.forEach((element) => {
    const INDEX = element.indexOf('=')
    const KEY = element.substring(0, INDEX)
    if (KEY.startsWith('func-')) {
      const VALUE = element.substring(INDEX+1, element.length)
      funcEnv[KEY.substring(funcLength, KEY.length)] = VALUE;
    }
  });
}

function putEnvToRuntime(list = {}) {
  const funcLength = 'func-'.length;
  list.forEach((element) => {
    const INDEX = element.indexOf('=')
    const KEY = element.substring(0, INDEX)
    if (KEY.startsWith('func-')) {
      const VALUE = element.substring(INDEX+1, element.length)
      process.env[KEY.substring(funcLength, KEY.length)] = VALUE;
    }
  });
}

function getFunctionEnvList(request, funcEnv) {
  putEnvToFunc(funcEnv, request.getFuncenvsList());
  putEnvToRuntime(request.getRuntimeenvsList());
  return funcEnv;
}

function deleteLoadingCache(handlerPath){
  // delete the remained loading cache
  try {
    logger.debug('delete resolve operate');
    const resolveResult = require.resolve(handlerPath);
    logger.debug('delete cache operate');
    delete require.cache[resolveResult];
  } catch (err) {
    try {
      require('@babel/register')({
        presets: ['@babel/preset-env'],
      });
      const mjsHandlerPath = handlerPath.replace(/js$/, 'mjs')
      const resolveResult = require.resolve(mjsHandlerPath);
      delete require.cache[resolveResult];
      logger.debug('delete cache err');
      return mjsHandlerPath
    } catch (mjsErr) {
      logger.warn(`failed to resolve the handler path, error:${err.message}`);
    }
  }
  return handlerPath
}

function getRespBodySize() {
  return parseInt(maxRequestBodySize * MEGABYTES);
}

module.exports = { recover, getFunctionEnvList, deleteLoadingCache, getRespBodySize };