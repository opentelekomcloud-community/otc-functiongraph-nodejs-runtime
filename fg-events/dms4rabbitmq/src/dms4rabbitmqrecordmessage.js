"use strict";

/**
 * @typedef {Object} DMS4RabbitMQRecordMessageObject
 * @property {string} [message] Raw message payload
 */

/**
 * @typedef {string | DMS4RabbitMQRecordMessageObject} DMS4RabbitMQRecordMessageJSON
 */

class DMS4RabbitMQRecordMessage {
  /**
   * @param {DMS4RabbitMQRecordMessageJSON} record
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
   * @returns {DMS4RabbitMQRecordMessageJSON} Payload as JSON object
   */
  toJSON() {
    return this._record;
  }
}

module.exports = {
  DMS4RabbitMQRecordMessage,
};