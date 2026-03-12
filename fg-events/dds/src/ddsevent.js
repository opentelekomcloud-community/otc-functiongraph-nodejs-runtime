"use strict";

const {DDSRecord} = require("./ddsrecord");

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

module.exports = { DDSEvent };
