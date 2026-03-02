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

const uuid = require('uuid'),
  Events = require('events'),
  funcCallEvents = new Events(),
  DEFAULT_TIMEOUT_SECOND = 60,
  SECONDS_OF_ONE_DAY = 86400,
  MAX_TIMEOUT_DAYS = 100,
  MAX_TIMEOUT_SECOND = MAX_TIMEOUT_DAYS * SECONDS_OF_ONE_DAY,
  MIN_TIMEOUT_SECOND = 5,
  CALL_ARGUMENTS_NUMBER = 3,
  VALUE_VALID = 0,
  VALUE_RANGE_INVALID = 1,
  VALUE_TYPE_INVALID = 2;

class RequestMsg {
  constructor(opts = {}, destAttr = null) {
    this.to = opts.to;
    this.request = opts.request;
    this.messageID = opts.messageID;
    this.timeout = opts.timeout;
    this.eventID = opts.eventID;
    this.traceID = opts.traceID;
    this.destAttr = destAttr;
  }
}

class CallConfig {
  constructor(destAttribute) {
    this.destAttribute = destAttribute;
  }
}

// @return true if valid
function checkContext(ctx = {}) {
  const MAX_INVOKE_ID_LENGTH = 64;
  return (typeof (ctx) === 'object' && ctx) && (typeof (ctx.invokeID) === 'string' &&
      ctx.invokeID.length < MAX_INVOKE_ID_LENGTH);
}

function checkCallConfig(config = {}) {
  const DEST_PLATFORM = '0',
    DEST_CUSTOMER = '1';

  return config instanceof CallConfig &&
    (config.destAttribute === DEST_PLATFORM ||
      config.destAttribute === DEST_CUSTOMER);
}

// Interface of remote function call
class Function {
  constructor(context) {
    if (!checkContext(context)) {
      throw new Error('Illegal argument');
    }
    this.context = context;
    this.timeout = DEFAULT_TIMEOUT_SECOND;
  }

  setTimeout(tmpTimeout) {
    if (typeof (tmpTimeout) !== 'number' || !Number.isInteger(tmpTimeout)) {
      return VALUE_TYPE_INVALID;
    }
    if (tmpTimeout > MAX_TIMEOUT_SECOND || tmpTimeout < MIN_TIMEOUT_SECOND) {
      return VALUE_RANGE_INVALID;
    }
    this.timeout = tmpTimeout;
    return VALUE_VALID;
  };

  // Call other function
  call(funcName, request, config = null) {
    // '3' is number of argument
    if (arguments.length > CALL_ARGUMENTS_NUMBER) {
      throw new Error(`Except 3 arguments, but receive ${arguments.length}`);
    }

    const msgUID = this.context.invokeID + uuid.v1();
    const opts = {
      to: funcName,
      request,
      messageID: msgUID,
      timeout: this.timeout,
      eventID: this.context.invokeID,
      traceID: this.context.traceID,
    };
    const reqMsg = new RequestMsg(opts);

    if (config) {
      if (!checkCallConfig(config)) {
        throw new Error('Illegal argument');
      }
      reqMsg.destAttr = config.destAttribute;
    }
    funcCallEvents.emit('request', reqMsg);

    return new Promise((resolve, reject) => {
      funcCallEvents.once(msgUID, (response) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response.content);
        }
      });
    });
  }
}

// The response from remote function call
class FuncResponse {
  constructor(error = null, content = null) {
    this.error = error;
    this.content = content;
  }
}

module.exports = {
  funcCallEvents,
  FuncResponse,
  CallConfig,
  Function,
};
