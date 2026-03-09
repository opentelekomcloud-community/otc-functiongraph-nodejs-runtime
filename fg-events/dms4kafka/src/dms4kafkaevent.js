/**
 * DMS4KafkaEvent Class
 * Represents a DMS4Kafka event for FunctionGraph
 */
class DMS4KafkaEvent {

  constructor(event) {
    this._event = event || {};

    this._records = [];
    for (const record of this._event.records || []) {
      this._records.push(new DMS4KafkaRecord(record));
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

class DMS4KafkaRecord {
  constructor(record) {
    this._record = record || {};

    this._messages = [];
    for (const message of this._record.messages || []) {
      this._messages.push(new DMS4KafkaRecordMessage(message));
    }
  }

  getTopic() {
    return this._record.topic || "";
  }

  getMessages() {
    return this._messages;
  }

  /**
   * Convert the event back to JSON
   * @returns {Object} Event as JSON object
   */
  toJSON() {
    return this._record;
  }
}

class DMS4KafkaRecordMessage {
  constructor(record) {
    this._record = record || {};
  }

  getMessage() {
    if (typeof this._record === "string") {
      return this._record;
    }
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

module.exports = { DMS4KafkaEvent, DMS4KafkaRecord, DMS4KafkaRecordMessage };
