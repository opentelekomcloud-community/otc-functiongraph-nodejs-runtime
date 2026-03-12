"use strict";

const { DMS4KafkaRecordMessage } = require("./dms4kafkarecordmessage");

class DMS4KafkaRecord {
  constructor(record) {
    this._record = record || {};

    this._messages = [];
    for (const message of this._record.messages || []) {
      this._messages.push(new DMS4KafkaRecordMessage(message));
    }
  }

  getTopicId() {
    return this._record.topic_id || "";
  }

  getMessages() {
    return this._messages;
  }

  /**
   * Convert the event back to JSON
   * @returns {Object} Event as JSON object
   */
  toJSON() {
    return this._record;
  }
}

module.exports = { DMS4KafkaRecord };
