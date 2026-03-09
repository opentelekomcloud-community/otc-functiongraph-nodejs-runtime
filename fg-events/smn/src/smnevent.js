/**
 * SMN Event Class
 * Represents a Simple Message Notification event from FunctionGraph
 */
class SMNEvent {
  constructor(event) {
    this._event = event || {};

    this._records = [];
    for (const record of this._event.record || []) {
      this._records.push(new SMNRecord(record));
    }
  }

  /**
   * Get the record array
   * @returns {Array} Array of event records
   */
  getRecords() {
    return this._records;
  }

  /**
   * Get the function name
   * @returns {string} Function name
   */
  getFunctionName() {
    return this._event.functionname || "";
  }

  /**
   * Get the request ID
   * @returns {string} Request ID
   */
  getRequestId() {
    return this._event.requestId || "";
  }

  /**
   * Get the timestamp
   * @returns {string} Event timestamp
   */
  getTimestamp() {
    return this._event.timestamp || "";
  }

  /**
   * Convert the event back to JSON
   * @returns {Object} Event as JSON object
   */
  toJSON() {
    return this._event;
  }
}

class SMNRecord {
  constructor(record) {
    this._record = record || {};
  }

  /**
   * Get event subscription URN
   * @returns {string} Event subscription URN
   */
  getEventSubscriptionUrn() {
    return this._record.event_subscription_urn || "";
  }

  /**
   * Get event source
   * @returns {string} Event source
   */
  getEventSource() {
    return this._record.event_source || "";
  }

  /**
   * Get SMN details from record
   * @returns {Object} SMN details object
   */
  getSMNBody() {
    return new SMNBody(this._record.smn);
  }

  /**
   * Convert the event back to JSON
   * @returns {Object} Event as JSON object
   */
  toJSON() {
    return this._record;
  }
}

class SMNBody {
  constructor(smn) {
    this._smn = smn || {};
  }

  /**
   * Get SMN topic URN
   * @returns {string} Topic URN
   */
  getTopicUrn() {
    return this._smn.topic_urn || "";
  }

  /**
   * Get SMN timestamp
   * @returns {string} SMN timestamp
   */
  getTimestamp() {
    return this._smn.timestamp || "";
  }

  /**
   * Get SMN message attributes
   * @returns {Object|null} Message attributes
   */
  getMessageAttributes() {
    return this._smn.message_attributes;
  }

  /**
   * Get SMN message content
   * @returns {string} Message content
   */
  getMessage() {
    return this._smn.message || "";
  }

  /**
   * Get SMN type
   * @returns {string} SMN type
   */
  getType() {
    return this._smn.type || "";
  }

  /**
   * Get SMN message ID
   * @returns {string} Message ID
   */
  getMessageId() {
    return this._smn.message_id || "";
  }

  /**
   * Get SMN message subject
   * @returns {string} Message subject
   */
  getSubject() {
    return this._smn.subject || "";
  }

  /**
   * Convert the event back to JSON
   * @returns {Object} Event as JSON object
   */
  toJSON() {
    return this._smn;
  }
}

module.exports = { SMNEvent, SMNRecord, SMNBody };
