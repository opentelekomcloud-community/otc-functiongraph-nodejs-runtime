/**
 * DMS4RocketMQEvent Class
 * Represents a DMS4RocketMQ event from FunctionGraph
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

class DMS4RocketMQRecord {
  constructor(record) {
    this._record = record || {};
  }

  getTopicId() {
    return this._record.topic || "";
  }

  getMessages() {
    const messages = [];
    for (const message of this._record.messages || []) {
      messages.push(new DMS4RocketMQRecordMessage(message));
    }
    return messages;
  }

  /**
   * Convert the event back to JSON
   * @returns {Object} Event as JSON object
   */
  toJSON() {
    return this._record;
  }
}

class DMS4RocketMQRecordMessage {
  constructor(record) {
    this._record = record || {};
  }

  getMessage() {
    return this._record.message || "";
  }

  /**
   * Convert the event back to JSON
   * @returns {Object} Event as JSON object
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
