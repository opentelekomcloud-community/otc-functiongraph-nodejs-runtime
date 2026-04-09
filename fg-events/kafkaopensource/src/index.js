"use strict";
const { KafkaOpenSourceEvent } = require("./kafkaopensourceevent");
const { KafkaOpenSourceRecord } = require("./kafkaopensourcerecord");
const { KafkaOpenSourceRecordMessage } = require("./kafkaopensourcerecordmessage");

/**
 * Public type exports for editor IntelliSense in downstream JavaScript projects.
 * @typedef {import("./kafkaopensourceevent").KafkaOpenSourceEventJSON} KafkaOpenSourceEventJSON
 * @typedef {import("./kafkaopensourceevent").KafkaOpenSourceRecordJSON} KafkaOpenSourceRecordJSON
 * @typedef {import("./kafkaopensourceevent").KafkaOpenSourceRecordMessageJSON} KafkaOpenSourceRecordMessageJSON
 * @typedef {import("./kafkaopensourceevent").KafkaOpenSourceRecordMessageObject} KafkaOpenSourceRecordMessageObject
 */
 
module.exports = {
  KafkaOpenSourceEvent,
  KafkaOpenSourceRecord,
  KafkaOpenSourceRecordMessage,
};
