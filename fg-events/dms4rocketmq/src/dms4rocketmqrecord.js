"use strict";
const { DMS4RocketMQRecordMessage } = require("./dms4rocketmqrecordmessage");

/**
 * @typedef {Object} DMS4RocketMQRecordMessageObject
 * @property {string} [message] Raw message payload
 */

/**
 * @typedef {string | DMS4RocketMQRecordMessageObject} DMS4RocketMQRecordMessageJSON
 */

/**
 * @typedef {Object} DMS4RocketMQRecordJSON
 * @property {string} [topic_id] Topic identifier
 * @property {DMS4RocketMQRecordMessageJSON[]} [messages] Messages received for the topic
 */

class DMS4RocketMQRecord {
  /**
   * @param {DMS4RocketMQRecordJSON} record
   */
  constructor(record) {
    this._record = record || {};

    this._messages = [];
    for (const message of this._record.messages || []) {
      this._messages.push(new DMS4RocketMQRecordMessage(message));
    }
  }

  /**
   * @returns {string}
   */
  getTopicId() {
    return this._record.topic_id || "";
  }

  /**
   * @returns {DMS4RocketMQRecordMessage[]}
   */
  getMessages() {
    return this._messages;
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {DMS4RocketMQRecordJSON} Payload as JSON object
   */
  toJSON() {
    return this._record;
  }
}

module.exports = {
  DMS4RocketMQRecord,
};