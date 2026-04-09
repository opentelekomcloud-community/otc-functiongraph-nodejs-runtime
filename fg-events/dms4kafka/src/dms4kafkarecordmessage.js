"use strict";

/**
 * @typedef {Object} DMS4KafkaRecordMessageObject
 * @property {string} [message] Raw message payload
 */

/**
 * @typedef {string | DMS4KafkaRecordMessageObject} DMS4KafkaRecordMessageJSON
 */

class DMS4KafkaRecordMessage {
  /**
   * @param {DMS4KafkaRecordMessageJSON} record
   */
  constructor(record) {
    this._record = record || {};
  }

  /**
   * @returns {string}
   */
  getMessage() {
    if (typeof this._record === "string") {
      return this._record;
    }
    return this._record.message || "";
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {DMS4KafkaRecordMessageJSON} Payload as JSON object
   */
  toJSON() {
    return this._record;
  }

}

module.exports = { DMS4KafkaRecordMessage };
