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

const { getRespBodySize, recover, getFunctionEnvList, deleteLoadingCache } = require('../utils');
const Exception = require('../errorHandler');
const runtimeError = require('../error.js');
const rpcMessage = require('../pb/rpc_pb.js');
const {Logger} =  require('../logger.js');

test('getRespBodySize 6MB', () => {
  expect(getRespBodySize()).toBe(6291456);
});

test('recover', () => {
  let response = null;
  recover((res) => {
    response = res
  }, Exception.newError(runtimeError.SYSTEM_CONVERT_JSON, ''));
  const pbError = response.getError();
  expect(pbError.getCode()).toBe(runtimeError.SYSTEM_CONVERT_JSON.code);
  expect(pbError.getMessage()).toBe(runtimeError.SYSTEM_CONVERT_JSON.message);
});

test('getFunctionEnvList', () => {
  const request = new rpcMessage.LoadRequest();
  request.setFuncenvsList(['func-env=1']);
  request.setRuntimeenvsList(['func-runtimeEnv=2']);
  const funcEnv = {};
  getFunctionEnvList(request, funcEnv);
  expect(funcEnv['env']).toBe('1');
  expect(process.env['runtimeEnv']).toBe('2');
});

test('logger', () => {
  const logger = new Logger('1','2');
  logger.setLevel('DEBUG');
  logger.info('info log');
  logger.warn('warn log');
  logger.debug('debug log');
  logger.info('EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, '
      + 'info log You can use this software according to the terms and conditions of the Mulan PSL v2.');
  expect(logger.logLevel).toBe('DEBUG');
});

describe('deleteLoadingCache', () => {
  afterEach(() => {
    jest.resetModules();
  });
  it('should delete the loading cache for a JavaScript handler', () => {
    const handlerPath = 'path/to/handler.js';
    const resolveResult = 'resolved-path/to/handler.js';
    jest.spyOn(require, 'resolve').mockReturnValue(resolveResult);
    const updatedHandlerPath = deleteLoadingCache(handlerPath);
    expect(updatedHandlerPath).toBe(handlerPath);
  });
  it('should handle error when resolving the handler path', () => {
    const handlerPath = 'path/to/handler.js';
    jest.spyOn(require, 'resolve').mockImplementation(() => {
      throw new Error('Module not found');
    });
    jest.spyOn(console, 'warn').mockImplementation();
    const updatedHandlerPath = deleteLoadingCache(handlerPath);
    expect(updatedHandlerPath).toBe(handlerPath);
  });
});