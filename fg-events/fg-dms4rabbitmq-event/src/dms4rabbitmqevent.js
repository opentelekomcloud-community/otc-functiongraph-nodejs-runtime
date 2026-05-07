"use strict";

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
 * @typedef {Object} DMS4RabbitMQRecordJSON
 * @property {string} [exchange] Exchange identifier
 * @property {DMS4RabbitMQRecordMessageJSON[]} [messages] Messages received for the exchange
 */

/**
 * @typedef {Object} DMS4RabbitMQRecordMessageObject
 * @property {string} [message] Raw message payload
 */

/**
 * @typedef {string | DMS4RabbitMQRecordMessageObject} DMS4RabbitMQRecordMessageJSON
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
  DMS4RabbitMQEvent,
  DMS4RabbitMQRecord,
  DMS4RabbitMQRecordMessage,
};
