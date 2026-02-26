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

process.env.NODE_VERSION = -1;

const { processInvoke, initializeFunction } = require('../runtimeHandler');
const rpcMessage = require('../pb/rpc_pb.js');
const childProcess = require('child_process');
const runtimeError = require('../error.js');
const { preLoadFunction } = require('./common');

const WHITE_SPACE_LENGTH = 4;

childProcess.execSync('mkdir -p /opt/function/code');
childProcess.execSync('cp ./test/functions/*.js /opt/function/code');


test('invalid nodejs version initializer', () => {
    const funcEnvList = ['func-RUNTIME_INITIALIZER_HANDLER=index.initializer']
    preLoadFunction('/opt/function/code/index.js', 'handler', funcEnvList)
    const request = new rpcMessage.InitializerRequest();
    const expectResponse = new rpcMessage.InitializerResponse();
    const pbError = new rpcMessage.Error();
    pbError.setCode(runtimeError.USER_INITIALIZATION_FUNCTION_EXCEPTION.code);
    const errorMessage = {
        "errorMessage": "System error, invalid Node.js version.",
    }
    pbError.setMessage(JSON.stringify(errorMessage, null, WHITE_SPACE_LENGTH));
    expectResponse.setError(pbError);
    initializeFunction((actualResponse) => {
        expect(actualResponse).toStrictEqual(expectResponse);
    }, request);
});

test('invalid nodejs version invoke', () => {
    preLoadFunction('/opt/function/code/index.js', 'handler', null)
    const request = new rpcMessage.InvokeRequest();
    request.setEvent(Buffer.from('{"key":"value"}'));
    const expectResponse = new rpcMessage.InvokeResponse();
    const pbError = new rpcMessage.Error();
    pbError.setCode(runtimeError.USER_FUNCTION_EXCEPTION.code);
    const errorMessage = {
        "errorMessage": "System error, invalid Node.js version.",
    }
    pbError.setMessage(JSON.stringify(errorMessage, null, WHITE_SPACE_LENGTH));
    expectResponse.setError(pbError);
    processInvoke((actualResponse) => {
        expect(actualResponse).toStrictEqual(expectResponse);
    }, request);
});