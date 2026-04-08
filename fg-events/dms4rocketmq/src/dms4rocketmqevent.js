"use strict";
const { DMS4RocketMQRecord } = require("./dms4rocketmqrecord");

/**
 * DMS4RocketMQEvent Class
 * Represents a DMS4RocketMQ event for FunctionGraph
 */
class DMS4RocketMQEvent {
  constructor(event) {
    this._event = event || {};
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
    const records = [];
    for (const record of this._event.records || []) {
      records.push(new DMS4RocketMQRecord(record));
    }
    return records;
  }

  /**
   * Convert the event back to JSON
   * @returns {Object} Event as JSON object
   */
  toJSON() {
    return this._event;
  }
}

module.exports = {
  DMS4RocketMQEvent,
};
