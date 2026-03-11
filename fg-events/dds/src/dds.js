"use strict";

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

module.exports = { DDS };