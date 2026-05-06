"use strict";

/**
 * @typedef {Object} DMS4KafkaEventJSON
 * @property {string} [event_version] Event schema version
 * @property {string} [event_time] Event creation time
 * @property {string} [region] Region where the event was emitted
 * @property {string} [trigger_type] Trigger type for this invocation
 * @property {string} [instance_id] DMS instance ID
 * @property {DMS4KafkaRecordJSON[]} [records] Event records
 */

/**
 * @typedef {Object} DMS4KafkaRecordJSON
 * @property {string} [topic_id] Topic identifier
 * @property {DMS4KafkaRecordMessageJSON[]} [messages] Messages received for the topic
 */
/**
 * @typedef {Object} DMS4KafkaRecordMessageObject
 * @property {string} [message] Raw message payload
 */

/**
 * @typedef {string | DMS4KafkaRecordMessageObject} DMS4KafkaRecordMessageJSON
 */

/**
 * DMS4KafkaEvent Class
 * Represents a DMS4Kafka event for FunctionGraph
 */
class DMS4KafkaEvent {
  /**
   * @param {DMS4KafkaEventJSON} event
   */
  constructor(event) {
    this._event = event || {};

    this._records = [];
    for (const record of this._event.records || []) {
      this._records.push(new DMS4KafkaRecord(record));
    }
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
   * @returns {DMS4KafkaRecord[]}
   */
  getRecords() {
    return this._records;
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {DMS4KafkaEventJSON} Payload as JSON object
   */
  toJSON() {
    return this._event;
  }
}

class DMS4KafkaRecord {
  /**
   * @param {DMS4KafkaRecordJSON} record
   */
  constructor(record) {
    this._record = record || {};

    this._messages = [];
    for (const message of this._record.messages || []) {
      this._messages.push(new DMS4KafkaRecordMessage(message));
    }
  }

  /**
   * @returns {string}
   */
  getTopicId() {
    return this._record.topic_id || "";
  }

  /**
   * @returns {DMS4KafkaRecordMessage[]}
   */
  getMessages() {
    return this._messages;
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {DMS4KafkaRecordJSON} Payload as JSON object
   */
  toJSON() {
    return this._record;
  }
}

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

module.exports = { DMS4KafkaEvent, DMS4KafkaRecord, DMS4KafkaRecordMessage };
