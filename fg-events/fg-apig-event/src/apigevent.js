"use strict";

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
 * @typedef {Object} APIGRequestContextJSON
 * @property {string} [apiId]
 * @property {string} [requestId]
 * @property {string} [stage]
 */

/**
 * @typedef {Object} APIGResponseJSON
 * @property {number} [statusCode]
 * @property {string} [body]
 * @property {Object} [headers]
 * @property {boolean} [isBase64Encoded]
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



class APIGResponse {
  /**
   * @param {number} [statusCode=200]
   * @param {string} [body=""]
   * @param {Object} [headers={}]
   * @param {boolean} [isBase64Encoded=false]
   */
  constructor(
    statusCode = 200,
    body = "",
    headers = {},
    isBase64Encoded = false,
  ) {
    this.statusCode = statusCode;
    this.body = body;
    this.headers = headers;
    this.isBase64Encoded = isBase64Encoded;
  }

  /**
   * @param {APIGResponseJSON} json
   * @returns {APIGResponse}
   */
  static fromJSON(json) {
    return new APIGResponse(
      json.statusCode,
      json.body,
      json.headers,
      json.isBase64Encoded,
    );
  }

  /**
   * @param {number} statusCode
   */
  setStatusCode(statusCode) {
    this.statusCode = statusCode;
  }

  /**
   * @param {string | Object} body
   * @param {boolean} [isBase64Encoded=false]
   */
  setBody(body, isBase64Encoded = false) {
    this.isBase64Encoded = isBase64Encoded;

    if (isBase64Encoded) {
      if (typeof body === "string") {
        this.body = Buffer.from(body, "utf-8").toString("base64");
      } else {
        this.body = Buffer.from(JSON.stringify(body), "utf-8").toString(
          "base64",
        );
      }
    } else {
      if (typeof body === "string") {
        this.body = body;
      } else {
        this.body = JSON.stringify(body);
      }
    }
  }

  /**
   * @returns {string}
   */
  getRawBody() {
    return this.body;
  }

  /**
   * @returns {string}
   */
  getBody() {
    if (this.isBase64Encoded) {
      const buff = Buffer.from(this.body, "base64");
      return buff.toString("utf-8");
    }
    return this.body;
  }

  /**
   * @returns {Object | string | null | undefined}
   */
  getBodyParsed() {
    if (this.body === undefined || this.body === null) {
      return this.body;
    }
    return JSON.parse(this.getBody());
  }

  /**
   * @returns {APIGResponseJSON}
   */
  toJSON() {
    return {
      statusCode: this.statusCode,
      body: this.body,
      headers: this.headers,
      isBase64Encoded: this.isBase64Encoded,
    };
  }
}

module.exports = { APIGEvent, APIGRequestContext, APIGResponse };
