"use strict";

const {DDSRecord} = require("./ddsrecord");

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

/**
 * @typedef {Object} DDSEventJSON
 * @property {DDSRecordJSON[]} [records] Event records
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

module.exports = { DDSEvent };
