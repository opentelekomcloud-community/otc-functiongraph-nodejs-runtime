"use strict";
const { DMS4KafkaRecord } = require("./dms4kafkarecord");

/**
 * @typedef {Object} DMS4KafkaRecordMessageObject
 * @property {string} [message] Raw message payload
 */

/**
 * @typedef {string | DMS4KafkaRecordMessageObject} DMS4KafkaRecordMessageJSON
 */

/**
 * @typedef {Object} DMS4KafkaRecordJSON
 * @property {string} [topic_id] Topic identifier
 * @property {DMS4KafkaRecordMessageJSON[]} [messages] Messages received for the topic
 */

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

module.exports = { DMS4KafkaEvent };
