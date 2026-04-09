"use strict";

/**
 * @typedef {Object} APIGRequestContextJSON
 * @property {string} [apiId]
 * @property {string} [requestId]
 * @property {string} [stage]
 */

class APIGRequestContext {
  /**
   * @param {APIGRequestContextJSON} requestContext
   */
  constructor(requestContext) {
    this._requestContext = requestContext || {};
  }

  /**
   * @returns {string}
   */
  getAPIId() {
    return this._requestContext.apiId || "";
  }

  /**
   * @returns {string}
   */
  getRequestId() {
    return this._requestContext.requestId || "";
  }

  /**
   * @returns {string}
   */
  getStage() {
    return this._requestContext.stage || "";
  }

  /**
   * @returns {APIGRequestContextJSON}
   */
  toJSON() {
    return this._requestContext;
  }
}

module.exports = { APIGRequestContext };
