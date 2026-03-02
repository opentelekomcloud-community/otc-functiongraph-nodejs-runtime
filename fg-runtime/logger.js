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

const util = require('util');
const rpcMessage = require('./pb/rpc_pb.js'),
  MINUTES_IN_ONE_HOUR = 60,
  UTC_MONTH_OFFSET = 1,
  TIMEZONE_NUMBER = 10,
  DATE_STRING_LENGTH = 1;

let currentRequestID = '',
  currentInvokeID = '',
  loggerServer = null;

function fixDate(date = {}) {
  let dateStr = String(date);
  if (dateStr.length === DATE_STRING_LENGTH) {
    dateStr = '0' + dateStr;
  }
  return dateStr;
}

function getTime() {
  const date = new Date(),
    timeZone = -date.getTimezoneOffset() / MINUTES_IN_ONE_HOUR;
  let timeZoneStr = '';
  if (timeZone >= 0) {
    if (timeZone >= TIMEZONE_NUMBER) {
      timeZoneStr = `+${timeZone}:00`;
    } else {
      timeZoneStr = `+0${timeZone}:00`;
    }
  } else {
    if (timeZone <= -TIMEZONE_NUMBER) {
      timeZoneStr = `-${-timeZone}:00`;
    } else {
      timeZoneStr = `-0${-timeZone}:00`;
    }
  }
  return date.getFullYear() + '-' + fixDate(date.getMonth() + UTC_MONTH_OFFSET) + '-'
    + fixDate(date.getDate()) + ' ' + fixDate(date.getHours()) + ':' + fixDate(date.getMinutes())
    + ':' + fixDate(date.getSeconds()) + '.' + date.getMilliseconds() +'000001'+ timeZoneStr;
}

const MAX_SINGLE_LOG_SIZE = 90 * 1024;

function splitString(str) {
  let lines = [];
  const splitTimes = Math.floor(str.length / MAX_SINGLE_LOG_SIZE);
  const remainder = str.length % MAX_SINGLE_LOG_SIZE;
  if (remainder === 0) {
    if (splitTimes === 0) {
      lines.push(str)
    }
    for (let i = 0; i < splitTimes; i++) {
      lines.push(str.slice(MAX_SINGLE_LOG_SIZE * i, MAX_SINGLE_LOG_SIZE * (i + 1)));
    }
  } else {
    for (let i = 0; i < splitTimes + 1; i++) {
      if (i < splitTimes) {
        lines.push(str.slice(MAX_SINGLE_LOG_SIZE * i, MAX_SINGLE_LOG_SIZE * (i + 1)));
      } else {
        lines.push(str.slice(MAX_SINGLE_LOG_SIZE * i, str.length));
      }
    }
  }
  return lines;
}

function sendLog(level, onlyMessage, invokeID, requestID, ...args) {
  const message = util.format(...args),
    record = new rpcMessage.FunctionLog();
  let lines = splitString(message);
  lines.forEach((line) => {
    if (!onlyMessage) {
      record.setTimestamp(getTime());
    }
    record.setContent(line);
    record.setLevel(level);
    record.setInvokeid(invokeID);
    record.setTraceid(requestID);
    // Write back log to rpc client
    if (loggerServer !== 'undefined' && loggerServer) {
      loggerServer.processLog(record);
    }
  });
}

class Logger {
  constructor(requestID = '', invokeID) {
    this.requestID = requestID;
    this.invokeID = invokeID;
    this.logLevel = 'INFO';
    currentRequestID = requestID
    currentInvokeID = invokeID
  }

  setLevel(level){
    if (level === 'INFO' || level === 'ERROR' || level === 'WARN' || level === 'DEBUG'){
      this.logLevel=level
    }
  }

  info(...args) {
    if (this.logLevel === 'INFO' || this.logLevel === 'DEBUG'){
      sendLog('INFO', false, this.invokeID, this.requestID, ...args)
    }
  }

  error(...args) {
    sendLog('ERROR', false, this.invokeID, this.requestID, ...args)
  }

  warn(...args) {
    if (this.logLevel === 'INFO' || this.logLevel === 'WARN' || this.logLevel === 'DEBUG'){
      sendLog('WARN', false, this.invokeID, this.requestID, ...args)
    }
  }

  debug(...args){
    if (this.logLevel === 'DEBUG'){
      sendLog('DEBUG', false, this.invokeID, this.requestID, ...args)
    }
  }
}

function redirectStdout() {
  process.stdout.write = (args) => {
    sendLog('INFO', true, currentInvokeID, currentRequestID, args);
  };

  process.stderr.write = (args) => {
    sendLog('ERROR', true, currentInvokeID, currentRequestID, args);
  };
}

function setLoggerServer(server) {
  loggerServer = server;
}

module.exports = {
  Logger,
  redirectStdout,
  setLoggerServer,
};
