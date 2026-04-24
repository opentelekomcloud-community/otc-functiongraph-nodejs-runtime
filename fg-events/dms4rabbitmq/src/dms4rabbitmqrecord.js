"use strict";
const { DMS4RabbitMQRecordMessage } = require("./dms4rabbitmqrecordmessage");

/**
 * @typedef {Object} DMS4RabbitMQRecordMessageObject
 * @property {string} [message] Raw message payload
 */

/**
 * @typedef {string | DMS4RabbitMQRecordMessageObject} DMS4RabbitMQRecordMessageJSON
 */

/**
 * @typedef {Object} DMS4RabbitMQRecordJSON
 * @property {string} [exchange] Exchange identifier
 * @property {DMS4RabbitMQRecordMessageJSON[]} [messages] Messages received for the exchange
 */

class DMS4RabbitMQRecord {
  /**
   * @param {DMS4RabbitMQRecordJSON} record
   */
  constructor(record) {
    this._record = record || {};

    this._messages = [];
    for (const message of this._record.messages || []) {
      this._messages.push(new DMS4RabbitMQRecordMessage(message));
    }
  }

  /**
   * @returns {string}
   */
  getExchange() {
    return this._record.exchange || "";
  }

  /**
   * @returns {DMS4RabbitMQRecordMessage[]}
   */
  getMessages() {
    return this._messages;
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {DMS4RabbitMQRecordJSON} Payload as JSON object
   */
  toJSON() {
    return this._record;
  }
}

module.exports = {
  DMS4RabbitMQRecord,
};