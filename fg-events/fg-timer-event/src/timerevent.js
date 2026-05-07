"use strict";

/**
 * @typedef {Object} TimerEventJSON
 * @property {string} [version]
 * @property {string} [time]
 * @property {string} [trigger_type]
 * @property {string} [trigger_name]
 * @property {string} [user_event]
 */

/**
 * Timer Event Class
 * Represents a Timer event for FunctionGraph
 */
class TimerEvent {
  /**
   * @param {TimerEventJSON} event
   */
  constructor(event) {
    this._event = event || {};
  }

  /**
   * Returns the event version.
   * @returns {string} Event version
   */
  getVersion() {
    return this._event.version || "";
  }

  /**
   * Returns the event time.
   * @returns {string} Event time
   */
  getTime() {
    return this._event.time || "";
  }

  /**
   * Returns the trigger type.
   * @returns {string} Trigger type
   */
  getTriggerType() {
    return this._event.trigger_type || "";
  }

  /**
   * Returns the trigger name.
   * @returns {string} Trigger name
   */
  getTriggerName() {
    return this._event.trigger_name || "";
  }

  /**
   * Returns the user event.
   * @returns {string} User event
   */
  getUserEvent() {
    return this._event.user_event || "";
  }

  /**
   * Returns the parsed user event, or undefined if parsing fails.
   * @returns {Object | undefined}
   */
  getUserEventParsed() {
    try {
      let result = JSON.parse(this._event.user_event);
      return result;
    } catch (err) {
      return undefined;
    }
  }

  /**
   * @returns {TimerEventJSON}
   */
  toJSON() {
    return this._event;
  }
}

module.exports = { TimerEvent };
