/**
 * LTS Event Class
 * Represents a LTS event from FunctionGraph
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
    return this._event.lts.data || "";
  }

  getData() {
    try {
      let buff = Buffer.from(this.getRawData(), "base64");
      let text = buff.toString("utf-8");
      return text;
    } catch (e) {
      return "";
    }
  }

  getLogs() {
    try {
      let data = this.getData();
      let jsonData = JSON.parse(data);
      return jsonData.logs || [];
    } catch (e) {
      return [];
    }
  }
}

module.exports = { LTSEvent };
