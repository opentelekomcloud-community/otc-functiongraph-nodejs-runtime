"use strict";

const { DDS } = require("./dds");

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

module.exports = { DDSRecord };
