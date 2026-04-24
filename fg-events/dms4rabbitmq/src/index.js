"use strict";
const { DMS4RabbitMQEvent } = require("./dms4rabbitmqevent");
const { DMS4RabbitMQRecord } = require("./dms4rabbitmqrecord");
const { DMS4RabbitMQRecordMessage } = require("./dms4rabbitmqrecordmessage");

/**
 * Public type exports for editor IntelliSense in downstream JavaScript projects.
 * @typedef {import("./dms4rabbitmqevent").DMS4RabbitMQEventJSON} DMS4RabbitMQEventJSON
 * @typedef {import("./dms4rabbitmqevent").DMS4RabbitMQRecordJSON} DMS4RabbitMQRecordJSON
 * @typedef {import("./dms4rabbitmqevent").DMS4RabbitMQRecordMessageJSON} DMS4RabbitMQRecordMessageJSON
 * @typedef {import("./dms4rabbitmqevent").DMS4RabbitMQRecordMessageObject} DMS4RabbitMQRecordMessageObject
 */

module.exports = {
  DMS4RabbitMQEvent,
  DMS4RabbitMQRecord,
  DMS4RabbitMQRecordMessage,
};
