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

// Message protocol message
const path = require('path'),
  os = require('os'),
  fs = require('fs'),
  NODE_VERSION = process.env.NODE_VERSION || '10',
  maxMsgLen = 1024,
  UTC_MONTH_OFFSET = 1,
  LOG_MESSAGE_SUB_START_INDEX = 0,
  FIX_NUMBER_SLICE = -2;

let logger = null;

// 时间补齐
function fix2number(num = {}) {
  return [0, num].join('').slice(FIX_NUMBER_SLICE);
}

class Message {
  constructor(options = {}) {
    this.magicNumber = options.magicNumber;
    this.version = options.version;
    this.packetType = options.packetType;
    this.metadataLen = options.metadataLen;
    this.payloadLen = options.payloadLen;
    this.packetID = options.packetID;
    this.metadata = options.metadata;
    this.payload = options.payload;
  }
}

function subMessage(message = {}) {
  const msgLen = message.length;
  if (msgLen > maxMsgLen) {
    return message.substring(LOG_MESSAGE_SUB_START_INDEX, maxMsgLen);
  }
  return message
}

class Logger {
  constructor(options = {}) {
    const data = fs.readFileSync('/home/snuser/config/nodejs-runtime-log.json'),
      logConfig = JSON.parse(data);
    const logPathENV = process.env.RUNTIME_LOG_PATH;
    const levelENV = process.env.RUNTIME_LOG_LEVEL;
    this.logFilename = logConfig.appenders.log_file.filename.replace(/RUNTIME_LOG_PATH/, logPathENV);
    this.logLevel = logConfig.categories.default.level.replace(/RUNTIME_LOG_LEVEL/, levelENV);
  }

  debug(message) {
    if (this.logLevel === 'DEBUG' ){
      this.write(message, 'DEBUG')
    }
  }

  info(message) {
    if (this.logLevel === 'DEBUG' || this.logLevel === 'INFO'){
      this.write(message, 'INFO')
    }
  }

  warn(message) {
    if (this.logLevel === 'DEBUG' || this.logLevel === 'INFO' || this.logLevel === 'WARN'){
      this.write(message, 'WARN')
    }
  }

  error(message) {
    this.write(message, 'ERROR')
  }

  write(message, level) {
    const today = new Date(),
      year = today.getUTCFullYear(),
      month = fix2number(today.getUTCMonth() + UTC_MONTH_OFFSET),
      day = fix2number(today.getUTCDate()),
      hours = fix2number(today.getUTCHours()),
      minutes = fix2number(today.getUTCMinutes()),
      seconds = fix2number(today.getUTCSeconds()),
      milliseconds = today.getUTCMilliseconds(),
      podName = os.hostname(),
      msg = subMessage(message),
      logContext = '[' + year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds + '.'
        + milliseconds + ' '
        + level + ' '
        + '[' + podName + '] '
        + msg + ' \n';
    fs.writeFile(this.logFilename, logContext, { flag: 'a+' }, (err) => {});
  }
}

if (NODE_VERSION === '6' || NODE_VERSION === '8'){
  logger = new Logger();
} else {
  const log4js = require('log4js');
  // User-defined log format. The time is the UTC time.
  log4js.addLayout('custom', () => function (logEvent) {
    const year = logEvent.startTime.getUTCFullYear(),
      month = fix2number(logEvent.startTime.getUTCMonth() + UTC_MONTH_OFFSET),
      day = fix2number(logEvent.startTime.getUTCDate()),
      hours = fix2number(logEvent.startTime.getUTCHours()),
      minutes = fix2number(logEvent.startTime.getUTCMinutes()),
      seconds = fix2number(logEvent.startTime.getUTCSeconds()),
      milliseconds = logEvent.startTime.getUTCMilliseconds(),
      filePathArr = logEvent.fileName.split(path.sep),
      len = filePathArr.length,
      msgLen = logEvent.data.toString().length,
      podName = os.hostname(),
      // ProcessID is assigned to threadID as nodejs is single-thread and cannot get threadID.
      threadID = logEvent.pid;
    let msg = '';
    if (msgLen > maxMsgLen) {
      msg = logEvent.data.toString().substring(0, maxMsgLen);
    } else {
      msg = logEvent.data.toString();
    }

    return '[' + year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds + '.'
      + milliseconds + ' '
      + logEvent.level.toString() + ' '
      + filePathArr[len - 1] + ':'
      + logEvent.lineNumber.toString() + '] '
      + '[' + podName + ' ' + threadID + '] '
      + msg + ' ';
  });
  const data = fs.readFileSync('/home/snuser/config/nodejs-runtime-log.json');
  let logConfig = JSON.parse(data);
  const logPathENV = process.env.RUNTIME_LOG_PATH;
  const levelENV = process.env.RUNTIME_LOG_LEVEL;
  const replacedFilename = logConfig.appenders.log_file.filename.replace(/RUNTIME_LOG_PATH/, logPathENV);
  logConfig.appenders.log_file.filename = replacedFilename;
  const replaceLevel = logConfig.categories.default.level.replace(/RUNTIME_LOG_LEVEL/, levelENV);
  logConfig.categories.default.level = replaceLevel;
  log4js.configure(logConfig);
  logger = log4js.getLogger('log_file');
}

module.exports = {
  Message,
  logger,
};
