"use strict";
/**
 * Timer Event Class
 * Represents a Timer event for FunctionGraph
 */
class TimerEvent {
  constructor(event) {
    this._event = event || {};
  }

  /**
   * Get event version
   * @returns {string} Event version
   */
  getVersion() {
    return this._event.version || "";
  }

  /**
   * Get event time
   * @returns {string} Event time
   */
  getTime() {
    return this._event.time || "";
  }

  /**
   * Get trigger type
   * @returns {string} Trigger type
   */
  getTriggerType() {
    return this._event.trigger_type || "";
  }

  /**
   * Get trigger name
   * @returns {string} Trigger name
   */
  getTriggerName() {
    return this._event.trigger_name || "";
  }

  /**
   * Get user event
   * @returns {string} User event
   */
  getUserEvent() {
    return this._event.user_event || "";
  }

  /**
   * get user event parsed as JSON or undefined if parsing fails
   * @returns 
   */
  getUserEventParsed() {
    try {
      let result = JSON.parse(this._event.user_event);
      return result;
    } catch (err) {
      return undefined;
    }
  }

  toJSON() {
    return this._event;
  }
}

module.exports = { TimerEvent };
