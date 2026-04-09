"use strict";
const { KafkaOpenSourceRecord } = require("./kafkaopensourcerecord");

/**
 * @typedef {Object} KafkaOpenSourceRecordMessageObject
 * @property {string} [message] Raw message payload
 */

/**
 * @typedef {string | KafkaOpenSourceRecordMessageObject} KafkaOpenSourceRecordMessageJSON
 */

/**
 * @typedef {Object} KafkaOpenSourceRecordJSON
 * @property {string} [topic_id] Topic identifier
 * @property {KafkaOpenSourceRecordMessageJSON[]} [messages] Messages received for the topic
 */

/**
 * @typedef {Object} KafkaOpenSourceEventJSON
 * @property {string} [event_version] Event schema version
 * @property {string} [event_time] Event creation time
 * @property {string} [region] Region where the event was emitted
 * @property {string} [trigger_type] Trigger type for this invocation
 * @property {string} [instance_id] DMS instance ID
 * @property {KafkaOpenSourceRecordJSON[]} [records] Event records
 */

/**
 * KafkaOpenSourceEvent Class
 * Represents a Kafka Open Source event for FunctionGraph
 */
class KafkaOpenSourceEvent {

  /**
   * @param {KafkaOpenSourceEventJSON} event
   */
  constructor(event) {
    this._event = event || {};

    this._records = [];
    for (const record of this._event.records || []) {
      this._records.push(new KafkaOpenSourceRecord(record));
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
   * @returns {KafkaOpenSourceRecord[]}
   */
  getRecords() {
    return this._records;
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {KafkaOpenSourceEventJSON} Payload as JSON object
   */
  toJSON() {
    return this._event;
  }
}

module.exports = { KafkaOpenSourceEvent };
