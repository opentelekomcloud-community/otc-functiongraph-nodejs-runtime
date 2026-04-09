"use strict";

/**
 * @typedef {Object} DMS4RocketMQRecordMessageObject
 * @property {string} [message] Raw message payload
 */

/**
 * @typedef {string | DMS4RocketMQRecordMessageObject} DMS4RocketMQRecordMessageJSON
 */

class DMS4RocketMQRecordMessage {
  /**
   * @param {DMS4RocketMQRecordMessageJSON} record
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
   * @returns {DMS4RocketMQRecordMessageJSON} Payload as JSON object
   */
  toJSON() {
    return this._record;
  }
}

module.exports = {
  DMS4RocketMQRecordMessage,
};