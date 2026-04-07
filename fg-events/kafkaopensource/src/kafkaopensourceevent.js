"use strict";
const { KafkaOpenSourceRecord } = require("./kafkaopensourcerecord");

/**
 * KafkaOpenSourceEvent Class
 * Represents a DMS4Kafka event for FunctionGraph
 */
class KafkaOpenSourceEvent {

  constructor(event) {
    this._event = event || {};

    this._records = [];
    for (const record of this._event.records || []) {
      this._records.push(new KafkaOpenSourceRecord(record));
    }
  }

  getEventVersion() {
    return this._event.event_version || "";
  }
  getEventTime() {
    return this._event.event_time || "";
  }
  getRegion() {
    return this._event.region || "";
  }

  getTriggerType() {
    return this._event.trigger_type || "";
  }
  getInstanceId() {
    return this._event.instance_id || "";
  }

  getRecords() {
    return this._records;
  }

  /**
   * Convert the event back to JSON
   * @returns {Object} Event as JSON object
   */
  toJSON() {
    return this._event;
  }
}

module.exports = { KafkaOpenSourceEvent };
