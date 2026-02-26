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

const CODE_ROOT = process.env.RUNTIME_CODE_ROOT || '/opt/function/code';
const STACK_FLAG = '    at';
const WHITE_SPACE_LENGTH = 4;
const MODULE_FUNCTION_SDK = 'function-javascript-sdk'

class ErrorWithCode extends Error {
  constructor(code, msg = '') {
    super(msg);
    this.code = code;
    this.message = msg;
  }
}

class FunctionError {
  constructor(code = 0, message = '') {
    this.code = code;
    this.message = message;
  }
}

function newError(errInfo = {}, message = '') {
  if (!message || message.length === 0) {
    return new FunctionError(errInfo.code, errInfo.message);
  }
  return new FunctionError(errInfo.code, errInfo.message + ': ' + message);
}

class UserFunctionError extends Error {
  constructor(msg = '') {
    super(msg);
    if (msg instanceof Error) {
      this.type = msg.name;
      this.stack = msg.stack;
      this.message = msg.message
    }
    if (msg instanceof ErrorWithCode) {
      this.type = msg.name;
      this.stack = msg.stack;
      this.message = msg.message
      this.code = msg.code
    }
    this.name = 'UserFunctionError';
  }
}

class FunctionLoadError extends Error {
  constructor(msg = '') {
    if (typeof(msg)==='string') {
      super(msg);
    } else {
      super(msg.message);
    }
    if (msg instanceof Error) {
      this.type = msg.name;
      this.stack = msg.stack;
      this.message = msg.message;
    }
    // rebuild error message for SyntaxError: add file info to error message.
    if (msg instanceof SyntaxError) {
      this.message = msg.message + ' (' + (msg.stack.split('\n')[0] || '') + ')';
    }
    this.name = 'FunctionLoadError';
  }
}

class FunctionConfigError extends Error {
  constructor(msg = '') {
    super(msg);
    if (msg instanceof Error) {
      this.type = msg.name;
      this.stack = msg.stack;
      this.message = msg.message;
    }
    this.name = 'FunctionConfigError';
  }
}

function buildUserStack(error = {}) {
  const stackFrames = error.stack.split('\n'),
    { length } = stackFrames;

  let userStackFrames = [],
    startIndex = -1,
    endIndex = -1;

  for (let i = length - 1; i >= 0; i--) {
    if (stackFrames[i].indexOf(CODE_ROOT) >= 0) {
      endIndex = i;
      break;
    }
  }
  for (let i = 0; i < length; i++) {
    if (stackFrames[i].indexOf(STACK_FLAG) >= 0 && stackFrames[i].indexOf(MODULE_FUNCTION_SDK) < 0) {
      startIndex = i;
      break;
    }
  }
  if (startIndex >= 0 && endIndex >= 0 && startIndex <= endIndex) {
    userStackFrames = stackFrames.slice(startIndex, endIndex + 1);
  }
  return userStackFrames;
}

function filterPath(message = {}) {
  return (String(message || '')).replace(new RegExp(CODE_ROOT, 'g'), '.');
}

function getErrorMsg(error = {}) {
  const errMsg = {
    errorMessage: error.message,
    errorType: error.type || error.name,
  };
  if (error instanceof UserFunctionError) {
    errMsg.stackTrace = (() => {
      const frames = buildUserStack(error);
      frames.forEach((item, index, arr) => {
        arr[index] = item.trim();
      });
      return frames;
    })();
  }
  return filterPath(JSON.stringify(errMsg, null, WHITE_SPACE_LENGTH));
}

/**
 * build user stack with error info, filter runtime stack
 * and save the error message for FunctionLoadError which caused by user code static syntax error
 * EX:
 * xxxxxxxxxerror message xxxxxxxxxxxx
 *     at xx/xx/xx
 *     at xx/xx/xx
 */
function buildUserStackWithErrInfo(error = {}) {
  const stackFrames = error.stack.split('\n'),
    { length } = stackFrames;
  let userStackFrames = [];
  if (error instanceof FunctionLoadError && error.type === 'SyntaxError') {
    for (let i = length - 1; i >= 0; i--) {
      if (stackFrames[i].indexOf(CODE_ROOT) >= 0 || stackFrames[i].indexOf(STACK_FLAG) < 0) {
        userStackFrames = stackFrames.slice(0, i + 1);
        break;
      }
    }
  } else {
    userStackFrames = buildUserStack(error)
    userStackFrames.unshift(stackFrames[0])
  }
  return userStackFrames;
}

function buildErrMessage(error = {}) {
  if (error instanceof Error) {
    const stackMessage = buildUserStackWithErrInfo(error).join('\n') || '';
    let messageEnd = '';
    if (stackMessage) {
      messageEnd = '\n';
    }
    return filterPath((error.message || '') + messageEnd + stackMessage);
  }
  if (typeof error === 'object') {
    return filterPath(JSON.stringify(error))
  }
  return filterPath(String(error));
}

module.exports = {
  UserFunctionError,
  FunctionLoadError,
  FunctionConfigError,
  FunctionError,
  getErrorMsg,
  buildErrMessage,
  newError,
  ErrorWithCode,
};