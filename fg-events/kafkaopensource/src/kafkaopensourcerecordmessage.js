"use strict";

/**
 * @typedef {Object} KafkaOpenSourceRecordMessageObject
 * @property {string} [message] Raw message payload
 */

/**
 * @typedef {string | KafkaOpenSourceRecordMessageObject} KafkaOpenSourceRecordMessageJSON
 */

class KafkaOpenSourceRecordMessage {
  /**
   * @param {KafkaOpenSourceRecordMessageJSON} record
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
   * @returns {KafkaOpenSourceRecordMessageJSON} Payload as JSON object
   */
  toJSON() {
    return this._record;
  }

}

module.exports = { KafkaOpenSourceRecordMessage };
