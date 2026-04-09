"use strict";

const { KafkaOpenSourceRecordMessage } = require("./kafkaopensourcerecordmessage");

/**
 * @typedef {Object} KafkaOpenSourceRecordMessageObject
 * @property {string} [message] Raw message payload
 */

/**
 * @typedef {string | KafkaOpenSourceRecordMessageObject} KafkaOpenSourceRecordMessageJSON
 */

/**
 * @typedef {Object} KafkaOpenSourceRecordJSON
 * @property {string} [topic_id] Topic identifier
 * @property {KafkaOpenSourceRecordMessageJSON[]} [messages] Messages received for the topic
 */

class KafkaOpenSourceRecord {
  /**
   * @param {KafkaOpenSourceRecordJSON} record
   */
  constructor(record) {
    this._record = record || {};

    this._messages = [];
    for (const message of this._record.messages || []) {
      this._messages.push(new KafkaOpenSourceRecordMessage(message));
    }
  }

  /**
   * @returns {string}
   */
  getTopicId() {
    return this._record.topic_id || "";
  }

  /**
   * @returns {KafkaOpenSourceRecordMessage[]}
   */
  getMessages() {
    return this._messages;
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {KafkaOpenSourceRecordJSON} Payload as JSON object
   */
  toJSON() {
    return this._record;
  }
}

module.exports = { KafkaOpenSourceRecord };
