"use strict";

/**
 * @typedef {Object} DMS4RocketMQEventJSON
 * @property {string} [event_version] Event schema version
 * @property {string} [event_time] Event creation time
 * @property {string} [region] Region where the event was emitted
 * @property {string} [trigger_type] Trigger type for this invocation
 * @property {string} [instance_id] DMS instance ID
 * @property {DMS4RocketMQRecordJSON[]} [records] Event records
 */

/**
 * @typedef {Object} DMS4RocketMQRecordMessageObject
 * @property {string} [message] Raw message payload
 */

/**
 * @typedef {string | DMS4RocketMQRecordMessageObject} DMS4RocketMQRecordMessageJSON
 */

/**
 * @typedef {Object} DMS4RocketMQRecordJSON
 * @property {string} [topic_id] Topic identifier
 * @property {DMS4RocketMQRecordMessageJSON[]} [messages] Messages received for the topic
 */

/**
 * DMS4RocketMQEvent Class
 * Represents a DMS4RocketMQ event for FunctionGraph
 */
class DMS4RocketMQEvent {
  /**
   * @param {DMS4RocketMQEventJSON} event
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
   * @returns {DMS4RocketMQRecord[]}
   */
  getRecords() {
    const records = [];
    for (const record of this._event.records || []) {
      records.push(new DMS4RocketMQRecord(record));
    }
    return records;
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {DMS4RocketMQEventJSON} Payload as JSON object
   */
  toJSON() {
    return this._event;
  }
}


class DMS4RocketMQRecord {
  /**
   * @param {DMS4RocketMQRecordJSON} record
   */
  constructor(record) {
    this._record = record || {};

    this._messages = [];
    for (const message of this._record.messages || []) {
      this._messages.push(new DMS4RocketMQRecordMessage(message));
    }
  }

  /**
   * @returns {string}
   */
  getTopicId() {
    return this._record.topic_id || "";
  }

  /**
   * @returns {DMS4RocketMQRecordMessage[]}
   */
  getMessages() {
    return this._messages;
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {DMS4RocketMQRecordJSON} Payload as JSON object
   */
  toJSON() {
    return this._record;
  }
}



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
  DMS4RocketMQEvent,
  DMS4RocketMQRecord,
  DMS4RocketMQRecordMessage,
};
