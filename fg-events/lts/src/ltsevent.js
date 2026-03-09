/**
 * LTS Event Class
 * Represents a LTS event for FunctionGraph
 */
class LTSEvent {
  constructor(event) {
    this._event = event || {};
  }

  /**
   * Get event data
   * @returns {string} Event data
   */
  getRawData() {
    return this._event.lts?.data || "";
  }

  getData() {
    try {
      const buff = Buffer.from(this.getRawData(), "base64");
      return buff.toString("utf-8");
    } catch (e) {
      return "";
    }
  }

  getLogs() {
    try {
      const data = this.getData();
      const jsonData = JSON.parse(data);
      return jsonData.logs || [];
    } catch (e) {
      return [];
    }
  }

  toJSON() {
    return this._event;
  }
}

module.exports = { LTSEvent };
