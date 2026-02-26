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

const Exception = require('../errorHandler');
const runtimeError = require('../error.js');
const {ErrorWithCode,UserFunctionError,FunctionLoadError,FunctionConfigError} = require("../errorHandler");

test('newError without message', () => {
    const error = Exception.newError(runtimeError.SYSTEM_CONVERT_JSON, '');
    expect(error.code).toBe(runtimeError.SYSTEM_CONVERT_JSON.code);
    expect(error.message).toBe(runtimeError.SYSTEM_CONVERT_JSON.message);
});

test('newError with message', () => {
    const message = "error message";
    const error = Exception.newError(runtimeError.SYSTEM_CONVERT_JSON, message);
    expect(error.code).toBe(runtimeError.SYSTEM_CONVERT_JSON.code);
    expect(error.message).toBe(runtimeError.SYSTEM_CONVERT_JSON.message + ': ' + message);
});

test('UserFunctionError with ErrorWithCodeCode', () => {
    const message = new ErrorWithCode(4007, '');
    const functionError = new UserFunctionError(message);
    const error = Exception.newError(functionError, '');
    expect(error.code).toBe(runtimeError.SYSTEM_CONVERT_JSON.code);
    expect(error.message).toBe('');
});

test('FunctionLoadError with Error', () => {
    const message = new Error('functionLoadError');
    const functionError = new FunctionLoadError(message);
    const error = Exception.newError(functionError, '');
    expect(error.message).toBe('functionLoadError');
});

test('FunctionConfigError with Error', () => {
    const message = new Error('functionConfigError');
    const functionError = new FunctionConfigError(message);
    const error = Exception.newError(functionError, '');
    expect(error.message).toBe('functionConfigError');
});

test('ErrMessage with stack', () => {
    const error = new Error('functionConfigError');
    error.stack = '/opt/function/code' + '\n';
    error.type = 'SyntaxError';
    const loadError = new FunctionLoadError(error);
    const stackMessage = Exception.buildErrMessage(loadError);
    expect(stackMessage).toBe('functionConfigError' + '\n' + '.');
});

test('ErrMessage with object', () => {
    const error = 'object';
    const stackMessage = Exception.buildErrMessage(error);
    expect(stackMessage).toBe('object');
});