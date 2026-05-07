"use strict";

/**
 * @typedef {Object} LTSEventPayload
 * @property {string} [data]
 */

/**
 * @typedef {Object} LTSEventJSON
 * @property {LTSEventPayload} [lts]
 */

/**
 * LTS Event Class
 * Represents a LTS event for FunctionGraph
 */
class LTSEvent {
  /**
   * @param {LTSEventJSON} event
   */
  constructor(event) {
    this._event = event || {};
  }

  /**
   * Returns the event data.
   * @returns {string} Event data
   */
  getRawData() {
    return this._event.lts?.data || "";
  }

  /**
   * @returns {string}
   */
  getData() {
    try {
      const buff = Buffer.from(this.getRawData(), "base64");
      return buff.toString("utf-8");
    } catch (e) {
      return "";
    }
  }

  /**
   * @returns {Object[]}
   */
  getLogs() {
    try {
      const data = this.getData();
      const jsonData = JSON.parse(data);
      return jsonData.logs || [];
    } catch (e) {
      return [];
    }
  }

  /**
   * @returns {LTSEventJSON}
   */
  toJSON() {
    return this._event;
  }
}

module.exports = { LTSEvent };
