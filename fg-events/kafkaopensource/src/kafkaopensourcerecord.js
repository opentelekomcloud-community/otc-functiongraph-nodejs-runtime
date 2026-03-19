"use strict";

const { KafkaOpenSourceRecordMessage } = require("./kafkaopensourcerecordmessage");

class KafkaOpenSourceRecord {
  constructor(record) {
    this._record = record || {};

    this._messages = [];
    for (const message of this._record.messages || []) {
      this._messages.push(new KafkaOpenSourceRecordMessage(message));
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

module.exports = { KafkaOpenSourceRecord };
