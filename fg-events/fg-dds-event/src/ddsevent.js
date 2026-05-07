"use strict";

/**
 * @typedef {Object} DDSEventJSON
 * @property {DDSRecordJSON[]} [records] Event records
 */

/**
 * @typedef {Object} DDSRecordJSON
 * @property {string} [event_source]
 * @property {string} [event_version]
 * @property {string} [event_name]
 * @property {string} [event_source_ip]
 * @property {string} [region]
 * @property {DDSJSON} [dds]
 */
/**
 * @typedef {Object} DDSJSON
 * @property {number} [size_bytes] Size of payload in bytes
 * @property {string} [token] Raw token JSON string
 * @property {string | Object} [full_document] Raw full document JSON value
 * @property {string | Object} [ns] Raw namespace JSON value
 */


/**
 * DDSEvent Class
 * Represents a DDS event for FunctionGraph
 */
class DDSEvent {
  /**
   * @param {DDSEventJSON} event
   */
  constructor(event) {
    this._event = event || {};

    this._records = [];
    for (const record of this._event.records || []) {
      this._records.push(new DDSRecord(record));
    }
  }

  /**
   * @returns {DDSRecord[]}
   */
  getRecords() {
    return this._records;
  }

  /**
   * @param {number} index
   * @returns {DDSRecord | null}
   */
  getRecord(index) {
    return this._records[index] || null;
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {DDSEventJSON} Payload as JSON object
   */
  toJSON() {
    return this._event;
  }
}



class DDSRecord {
  /**
   * @param {DDSRecordJSON} record
   */
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

  /**
   * @returns {DDS}
   */
  getDDS() {
    return new DDS(this._record.dds);
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {DDSRecordJSON} Payload as JSON object
   */
  toJSON() {
    return this._record;
  }
}



class DDS {
  /**
   * @param {DDSJSON} dds
   */
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
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {DDSJSON} Payload as JSON object
   */
  toJSON() {
    return this._dds;
  }
}

module.exports = { DDSEvent, DDSRecord, DDS };
