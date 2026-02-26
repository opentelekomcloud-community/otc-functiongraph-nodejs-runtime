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

const {processInvoke} = require('../runtimeHandler');
const rpcMessage = require('../pb/rpc_pb.js');
const childProcess = require('child_process');
const {preLoadFunction} = require('./common');
const stateEvent = require('../pb/stateful_event_pb.js');
const runtimeError = require('../error.js');

childProcess.execSync('mkdir -p /opt/function/code');
childProcess.execSync('cp ./test/functions/stateful/*.js /opt/function/code');

const WHITE_SPACE_LENGTH = 4;

const tests = [
  {
    name: 'invoke addone',
    entry: '/opt/function/code/addone.js',
    handler: 'handler',
    expectResult: 1,
    expectState: { counter: 1 },
    expectErrorCode: null,
    expectErrorMessage: null
  },
  {
    name: 'can\'t find module',
    entry: '/opt/function/code/notExists.js',
    handler: 'handler',
    expectResult: null,
    expectErrorCode: runtimeError.USER_STATE_UNDEFINED.code,
    expectErrorMessage: {
      "errorMessage": "init state function invocation exception, error: not found module './notExists.js'",
      "errorType": "FunctionLoadError"
    },
  },
  {
    name: 'init state function is not exists',
    entry: '/opt/function/code/initStateNotFunction.js',
    handler: 'handler',
    expectResult: null,
    expectErrorCode: runtimeError.USER_STATE_UNDEFINED.code,
    expectErrorMessage: {
      "errorMessage": "init state function invocation exception, error: initState function is not exist",
      "errorType": "FunctionLoadError"
    },
  },
  {
    name: 'initState bad happened',
    entry: '/opt/function/code/initStateThrowError.js',
    handler: 'handler',
    expectResult: null,
    expectErrorCode: runtimeError.USER_STATE_UNDEFINED.code,
    expectErrorMessage: {
      "errorMessage": "init state function invocation exception, error: init state bad happened",
      "errorType": "Error",
      "stackTrace": [
         "at Object.<anonymous>.module.exports.initState (./initStateThrowError.js:17:9)"
      ]
    },
  },
  {
    name: 'undefined state',
    entry: '/opt/function/code/undefinedState.js',
    handler: 'handler',
    expectResult: null,
    expectErrorCode: runtimeError.USER_STATE_UNDEFINED.code,
    expectErrorMessage: {
      "errorMessage": "init state function invocation exception, error: state is undefined",
      "errorType": "UserFunctionError",
      "stackTrace": []
    }
  },
  {
    name: 'too big state',
    entry: '/opt/function/code/tooBigState.js',
    handler: 'handler',
    expectResult: null,
    expectErrorCode: runtimeError.USER_STATE_TOO_LARGE.code,
    expectErrorMessage: {
      "errorMessage": runtimeError.USER_STATE_TOO_LARGE.message
    }
  }
];

describe('test stateful invoke', () => {
  for(let i = 0; i < tests.length; i++){
    it(tests[i].name, () => {
      preLoadFunction(tests[i].entry, tests[i].handler, [])
      const request = new rpcMessage.InvokeRequest();
      const state = new stateEvent.State();
      state.setId('stateID');
      state.setContent('');
      const statefulevent = new stateEvent.StatefulEvent();
      statefulevent.setState(state);
      statefulevent.setEvent(Buffer.from('{"key":"value"}'))
      request.setEvent(statefulevent.serializeBinary());

      const expectResponse = new rpcMessage.InvokeResponse();
      if (tests[i].expectResult !== null) {
        const statefulResult = new stateEvent.StatefulResult();
        statefulResult.setResult(Buffer.from(String(tests[i].expectResult)));
        const expectResponse = new rpcMessage.InvokeResponse();
        expectResponse.setResult(statefulResult.serializeBinary());
      } else {
        const pbError = new rpcMessage.Error();
        pbError.setCode(tests[i].expectErrorCode);
        pbError.setMessage(JSON.stringify(tests[i].expectErrorMessage, null, WHITE_SPACE_LENGTH));
        expectResponse.setError(pbError);
      }
      processInvoke((actualResponse) => {
        expect(actualResponse).toStrictEqual(expectResponse);
      }, request);
    });
  }
});