"use strict";
const { APIGRequestContext } = require("./apigrequestcontext");

/**
 * @typedef {Object} APIGRequestContextJSON
 * @property {string} [apiId]
 * @property {string} [requestId]
 * @property {string} [stage]
 */

/**
 * @typedef {Object} APIGEventJSON
 * @property {string} [body]
 * @property {boolean} [isBase64Encoded]
 * @property {APIGRequestContextJSON} [requestContext]
 * @property {Object} [queryStringParameters]
 * @property {string} [httpMethod]
 * @property {Object} [pathParameters]
 * @property {Object} [headers]
 * @property {string} [path]
 */

/**
 * APIGEvent Class
 * Represents an API Gateway event for FunctionGraph
 */
class APIGEvent {
  /**
   * @param {APIGEventJSON} event
   */
  constructor(event) {
    this._event = event || {};
  }

  /**
   * Returns the decoded request body.
   * @returns {string} Body content in plain text
   */
  getBody() {
    const body = this._event.body;
    if (this._event.isBase64Encoded) {
      if (typeof body !== "string" || body.length === 0) {
        return "";
      }

      try {
        const buff = Buffer.from(body, "base64");
        return buff.toString("utf-8");
      } catch (e) {
        return "";
      }
    }

    return body || "";
  }

  /**
   * Returns the raw request body.
   * @returns {string} Body content as received
   */
  getRawBody() {
    return this._event.body || "";
  }

  /**
   * @returns {APIGRequestContext}
   */
  getRequestContext() {
    return new APIGRequestContext(this._event.requestContext);
  }

  getRequestContextValue(key) {
    const requestContext = this.getRequestContext();
    const paramValue =
      requestContext.getValue(key) ||
      requestContext.getValue(key.toLowerCase());
    return paramValue || "";
  }

  /**
   * @returns {Object}
   */
  getQueryStringParameters() {
    return this._event.queryStringParameters || {};
  }

  /**
   * @param {string} paramName
   * @returns {string}
   */
  getQueryStringParameter(paramName) {
    const params = this.getQueryStringParameters();
    const paramValue = params[paramName] || params[paramName.toLowerCase()];
    return paramValue || "";
  }

  /**
   * @returns {string}
   */
  getHTTPMethod() {
    return this._event.httpMethod || "";
  }

  /**
   * @returns {Object}
   */
  getPathParameters() {
    return this._event.pathParameters || {};
  }

  /**
   *
   * @param {string} paramName
   * @returns {string}
   */
  getPathParameter(paramName) {
    const params = this.getPathParameters();
    const paramValue = params[paramName] || params[paramName.toLowerCase()];
    return paramValue || "";
  }

  /**
   * @returns {Object}
   */
  getHeaders() {
    return this._event.headers || {};
  }

  /**
   * @param {string} headerName
   * @returns {string}
   */
  getHeader(headerName) {
    const headers = this.getHeaders();
    const headerValue =
      headers[headerName] || headers[headerName.toLowerCase()];
    return headerValue || "";
  }

  /**
   * @returns {string}
   */
  getPath() {
    return this._event.path || "";
  }

  /**
   * @returns {boolean}
   */
  isBase64Encoded() {
    return this._event.isBase64Encoded;
  }

  /**
   * @returns {APIGEventJSON}
   */
  toJSON() {
    return this._event;
  }
}

module.exports = { APIGEvent };
