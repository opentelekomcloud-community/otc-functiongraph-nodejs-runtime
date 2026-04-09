"use strict";

/**
 * @typedef {Object} DDSJSON
 * @property {number} [size_bytes] Size of payload in bytes
 * @property {string} [token] Raw token JSON string
 * @property {string | Object} [full_document] Raw full document JSON value
 * @property {string | Object} [ns] Raw namespace JSON value
 */

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

module.exports = { DDS };