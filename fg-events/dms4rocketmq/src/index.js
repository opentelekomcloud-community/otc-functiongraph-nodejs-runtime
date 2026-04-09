"use strict";
const { DMS4RocketMQEvent } = require("./dms4rocketmqevent");
const { DMS4RocketMQRecord } = require("./dms4rocketmqrecord");
const { DMS4RocketMQRecordMessage } = require("./dms4rocketmqrecordmessage");

/**
 * Public type exports for editor IntelliSense in downstream JavaScript projects.
 * @typedef {import("./dms4rocketmqevent").DMS4RocketMQEventJSON} DMS4RocketMQEventJSON
 * @typedef {import("./dms4rocketmqevent").DMS4RocketMQRecordJSON} DMS4RocketMQRecordJSON
 * @typedef {import("./dms4rocketmqevent").DMS4RocketMQRecordMessageJSON} DMS4RocketMQRecordMessageJSON
 * @typedef {import("./dms4rocketmqevent").DMS4RocketMQRecordMessageObject} DMS4RocketMQRecordMessageObject
 */

module.exports = {
  DMS4RocketMQEvent,
  DMS4RocketMQRecord,
  DMS4RocketMQRecordMessage,
};
