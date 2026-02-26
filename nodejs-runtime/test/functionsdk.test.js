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

const functionSDK = require('../functionsdk');
const{ Context } = require('../context');


test('new FuncResponse', () => {
  const resp = new functionSDK.FuncResponse("error_code","error_message");
  expect(resp).toBeTruthy();
  expect(resp.error).toBe("error_code");
  expect(resp.content).toBe("error_message");
});

test('new CallConfig', () => {
  const callConfig = new functionSDK.CallConfig("destAttribute");
  expect(callConfig).toBeTruthy();
  expect(callConfig.destAttribute).toBe("destAttribute");
});

test('new Function and setTimeOut', () => {
  const opts = {
    requestID: "1",
    invokeID: "2",
    funcEnv: {},
  };
  const context = new Context(opts);
  const func = new functionSDK.Function(context);
  expect(func).toBeTruthy();

  let actual = func.setTimeout("1");
  const VALUE_TYPE_INVALID = 2
  expect(actual).toBe(VALUE_TYPE_INVALID);

  actual = func.setTimeout(1);
  const VALUE_RANGE_INVALID = 1
  expect(actual).toBe(VALUE_RANGE_INVALID);

  actual = func.setTimeout(8640001);
  expect(actual).toBe(VALUE_RANGE_INVALID);

  actual = func.setTimeout(10);
  const VALUE_VALID = 0
  expect(actual).toBe(VALUE_VALID);
});

test('new Function and call', () => {
  const opts = {
    requestID: "1",
    invokeID: "2",
    funcEnv: {},
  };
  const context = new Context(opts);
  const func = new functionSDK.Function(context);
  const config = new functionSDK.CallConfig('0');
  let res = func.call('test','', config);
  expect(res.toString()).toBe('[object Promise]');
});