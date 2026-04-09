"use strict";

const { DMS4KafkaRecordMessage } = require("./dms4kafkarecordmessage");

/**
 * @typedef {Object} DMS4KafkaRecordMessageObject
 * @property {string} [message] Raw message payload
 */

/**
 * @typedef {string | DMS4KafkaRecordMessageObject} DMS4KafkaRecordMessageJSON
 */

/**
 * @typedef {Object} DMS4KafkaRecordJSON
 * @property {string} [topic_id] Topic identifier
 * @property {DMS4KafkaRecordMessageJSON[]} [messages] Messages received for the topic
 */

class DMS4KafkaRecord {
  /**
   * @param {DMS4KafkaRecordJSON} record
   */
  constructor(record) {
    this._record = record || {};

    this._messages = [];
    for (const message of this._record.messages || []) {
      this._messages.push(new DMS4KafkaRecordMessage(message));
    }
  }

  /**
   * @returns {string}
   */
  getTopicId() {
    return this._record.topic_id || "";
  }

  /**
   * @returns {DMS4KafkaRecordMessage[]}
   */
  getMessages() {
    return this._messages;
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {DMS4KafkaRecordJSON} Payload as JSON object
   */
  toJSON() {
    return this._record;
  }
}

module.exports = { DMS4KafkaRecord };
