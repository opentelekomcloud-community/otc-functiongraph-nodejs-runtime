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

process.env.NODE_VERSION = 6;

const { processInvoke, initializeFunction } = require('../runtimeHandler');
const rpcMessage = require('../pb/rpc_pb.js');
const childProcess = require('child_process');
const runtimeError = require('../error.js');
const { preLoadFunction } = require('./common');

const WHITE_SPACE_LENGTH = 4;

childProcess.execSync('mkdir -p /opt/function/code');
childProcess.execSync('cp ./test/functions/*.js /opt/function/code');


const invoke_tests = [
    {
        name: "nodejs6 handler args should be 3",
        entry: '/opt/function/code/nodejs6.js',
        handler: 'fourArgsError',
        expectResult: null,
        expectErrorCode: runtimeError.FUNCTION_ENTRY_EXCEPTION.code,
        expectErrorMessage: {
            "errorMessage": "function entry exception, error: handler expect to have 3 parameters, but received 4",
            "errorType": "FunctionLoadError",
        }
    },
    {
        name: "invoke successfully",
        entry: '/opt/function/code/nodejs6.js',
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
    }
];

describe('test handler args', () => {
    for(let i = 0; i < invoke_tests.length; i++){
        it(invoke_tests[i].name, () => {
            preLoadFunction(invoke_tests[i].entry, invoke_tests[i].handler, [])
            const request = new rpcMessage.InvokeRequest();
            request.setEvent( Buffer.from('{"key":"value"}'));
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

test('nodejs6 initializer', () => {
    const funcEnvList = ['func-RUNTIME_INITIALIZER_HANDLER=nodejs6.initializer']
    preLoadFunction('/opt/function/code/nodejs6.js', 'handler', funcEnvList)
    const request = new rpcMessage.InitializerRequest();
    const expectResponse = new rpcMessage.InitializerResponse();
    initializeFunction((actualResponse) => {
        expect(actualResponse).toStrictEqual(expectResponse);
    }, request);
});