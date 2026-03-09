/**
 * DDSEvent Class
 * Represents a DDS event for FunctionGraph
 */
class DDSEvent {
  

  constructor(event) {
    this._event = event || {};

    this._records = [];
    for (const record of this._event.records || []) {
      this._records.push(new DDSRecord(record));
    }
  }

  getRecords() {
    return this._records;
  }
  getRecord(index) {
    return this._records[index] || null;
  }

  /**
   * Convert the event back to JSON
   * @returns {Object} Event as JSON object
   */
  toJSON() {
    return this._event;
  }

}

class DDSRecord {
  constructor(record) {
    this._record = record || {};
  }

  getEventSource() {
    return this._record.event_source || "";
  }
  getEventVersion() {
    return this._record.event_version || "";
  }
  getEventName() {
    return this._record.event_name || "";
  }
  getEventSourceIp() {
    return this._record.event_source_ip || "";
  }
  getRegion() {
    return this._record.region || "";
  }

  getDDS() {
    return new DDS(this._record.dds);
  }

  /**
   * Convert the event back to JSON
   * @returns {Object} Event as JSON object
   */
  toJSON() {
    return this._record;
  }
}

class DDS {
  constructor(dds) {
    this._dds = dds || {};
  }

  getSizeBytes() {
    return this._dds.size_bytes || 0;
  }

  getTokenRaw() {
    return this._dds.token || "";
  }

  getToken() {
    try {
      return JSON.parse(this._dds.token || "{}");
    } catch (e) {
      return {};
    }
  }
  getFullDocumentRaw() {
    return this._dds.full_document || {};
  }

  getFullDocument() {
    try {
      return JSON.parse(this._dds.full_document || "{}");
    } catch (e) {
      return {};
    }
  }
  getNSRaw() {
    return this._dds.ns || "";
  }

  getNS() {
    try {
      return JSON.parse(this._dds.ns || "{}");
    } catch (e) {
      return {};
    }
  }

  /**
   * Convert the event back to JSON
   * @returns {Object} Event as JSON object
   */
  toJSON() {
    return this._dds;
  }
}

module.exports = { DDSEvent, DDSRecord, DDS };
