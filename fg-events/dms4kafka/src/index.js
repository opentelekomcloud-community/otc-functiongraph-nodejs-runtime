"use strict";
const { DMS4KafkaEvent } = require("./dms4kafkaevent");
const { DMS4KafkaRecord } = require("./dms4kafkarecord");
const { DMS4KafkaRecordMessage } = require("./dms4kafkarecordmessage");

/**
 * Public type exports for editor IntelliSense in downstream JavaScript projects.
 * @typedef {import("./dms4kafkaevent").DMS4KafkaEventJSON} DMS4KafkaEventJSON
 * @typedef {import("./dms4kafkaevent").DMS4KafkaRecordJSON} DMS4KafkaRecordJSON
 * @typedef {import("./dms4kafkaevent").DMS4KafkaRecordMessageJSON} DMS4KafkaRecordMessageJSON
 * @typedef {import("./dms4kafkaevent").DMS4KafkaRecordMessageObject} DMS4KafkaRecordMessageObject
 */

module.exports = {
  DMS4KafkaEvent,
  DMS4KafkaRecord,
  DMS4KafkaRecordMessage,
};
