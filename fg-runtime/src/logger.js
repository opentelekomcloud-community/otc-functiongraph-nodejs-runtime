"use strict";
const util = require("util");
const moment = require("moment");

function getTime() {
  return moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
}

const MAX_SINGLE_LOG_SIZE = 90 * 1024;

function splitString(str) {
  let lines = [];
  const splitTimes = Math.floor(str.length / MAX_SINGLE_LOG_SIZE);
  const remainder = str.length % MAX_SINGLE_LOG_SIZE;
  if (remainder === 0) {
    if (splitTimes === 0) {
      lines.push(str);
    }
    for (let i = 0; i < splitTimes; i++) {
      lines.push(
        str.slice(MAX_SINGLE_LOG_SIZE * i, MAX_SINGLE_LOG_SIZE * (i + 1)),
      );
    }
  } else {
    for (let i = 0; i < splitTimes + 1; i++) {
      if (i < splitTimes) {
        lines.push(
          str.slice(MAX_SINGLE_LOG_SIZE * i, MAX_SINGLE_LOG_SIZE * (i + 1)),
        );
      } else {
        lines.push(str.slice(MAX_SINGLE_LOG_SIZE * i, str.length));
      }
    }
  }
  return lines;
}

function sendLog(level, onlyMessage, invokeID, requestID, ...args) {
  const message = util.format(...args);

  let lines = splitString(message);

  let spacedInvokeID = invokeID ? ` ${invokeID} ` : " ";

  lines.forEach((line) => {
    if (!onlyMessage) {
      console.log(
        "%s %s%s%s %s",
        getTime(),
        requestID,
        spacedInvokeID,
        level,
        line,
      );
    } else {
      console.log("%s%s%s %s", requestID, spacedInvokeID, level, line);
    }
  });
}

class Logger {
  constructor(requestID, invokeID = "") {
    this.requestID = requestID;
    this.invokeID = invokeID;
    this.logLevel = "INFO";
  }

  setLevel(level) {
    if (
      level === "INFO" ||
      level === "ERROR" ||
      level === "WARN" ||
      level === "DEBUG"
    ) {
      this.logLevel = level;
    }
  }

  info(...args) {
    if (this.logLevel === "INFO" || this.logLevel === "DEBUG") {
      sendLog("INFO", false, this.invokeID, this.requestID, ...args);
    }
  }

  error(...args) {
    sendLog("ERROR", false, this.invokeID, this.requestID, ...args);
  }

  warn(...args) {
    if (
      this.logLevel === "INFO" ||
      this.logLevel === "WARN" ||
      this.logLevel === "DEBUG"
    ) {
      sendLog("WARN", false, this.invokeID, this.requestID, ...args);
    }
  }

  debug(...args) {
    if (this.logLevel === "DEBUG") {
      sendLog("DEBUG", false, this.invokeID, this.requestID, ...args);
    }
  }
}

module.exports = {
  Logger,
};
