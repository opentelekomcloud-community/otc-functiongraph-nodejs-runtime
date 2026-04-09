"use strict";

const { DDS } = require("./dds");

/**
 * @typedef {Object} DDSJSON
 * @property {number} [size_bytes] Size of payload in bytes
 * @property {string} [token] Raw token JSON string
 * @property {string | Object} [full_document] Raw full document JSON value
 * @property {string | Object} [ns] Raw namespace JSON value
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

module.exports = { DDSRecord };
