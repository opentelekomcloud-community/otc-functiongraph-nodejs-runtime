"use strict";
const { DMS4RabbitMQRecord } = require("./dms4rabbitmqrecord");

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

/**
 * @typedef {Object} DMS4RabbitMQEventJSON
 * @property {string} [event_version] Event schema version
 * @property {string} [event_time] Event creation time
 * @property {string} [region] Region where the event was emitted
 * @property {string} [trigger_type] Trigger type for this invocation
 * @property {string} [instance_id] DMS instance ID
 * @property {DMS4RabbitMQRecordJSON[]} [records] Event records
 */

/**
 * DMS4RabbitMQEvent Class
 * Represents a DMS4RabbitMQ event for FunctionGraph
 */
class DMS4RabbitMQEvent {
  /**
   * @param {DMS4RabbitMQEventJSON} event
   */
  constructor(event) {
    this._event = event || {};
  }

  /**
   * @returns {string}
   */
  getEventVersion() {
    return this._event.event_version || "";
  }

  /**
   * @returns {string}
   */
  getEventTime() {
    return this._event.event_time || "";
  }

  /**
   * @returns {string}
   */
  getRegion() {
    return this._event.region || "";
  }

  /**
   * @returns {string}
   */
  getTriggerType() {
    return this._event.trigger_type || "";
  }

  /**
   * @returns {string}
   */
  getInstanceId() {
    return this._event.instance_id || "";
  }

  /**
   * @returns {DMS4RabbitMQRecord[]}
   */
  getRecords() {
    const records = [];
    for (const record of this._event.records || []) {
      records.push(new DMS4RabbitMQRecord(record));
    }
    return records;
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {DMS4RabbitMQEventJSON} Payload as JSON object
   */
  toJSON() {
    return this._event;
  }
}

module.exports = {
  DMS4RabbitMQEvent,
};
