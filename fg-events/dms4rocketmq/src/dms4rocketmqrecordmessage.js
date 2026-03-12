"use strict";
class DMS4RocketMQRecordMessage {
  constructor(record) {
    this._record = record || {};
  }

  getMessage() {
    if (typeof this._record === "string") {
      return this._record;
    }
    return this._record.message || "";
  }

  /**
   * Convert the event back to JSON
   * @returns {Object} Event as JSON object
   */
  toJSON() {
    return this._record;
  }
}

module.exports = {
  DMS4RocketMQRecordMessage,
};