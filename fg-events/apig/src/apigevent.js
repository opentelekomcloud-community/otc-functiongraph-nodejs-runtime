"use strict";
const { APIGRequestContext } = require("./apigrequestcontext");

/**
 * APIGEvent Class
 * Represents an API Gateway event for FunctionGraph
 */
class APIGEvent {
  constructor(event) {
    this._event = event || {};
  }

  /**
   * 
   * @returns content of body unencoded
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
   * 
   * @returns content of body as is
   */
  getRawBody() {
    return this._event.body || "";
  }

  getRequestContext() {
    return new APIGRequestContext(this._event.requestContext);
  }

  getQueryStringParameters() {
    return this._event.queryStringParameters || {};
  }

  getHTTPMethod() {
    return this._event.httpMethod || "";
  }

  getPathParameters() {
    return this._event.pathParameters || {};
  }

  getHeaders() {
    return this._event.headers || {};
  }

  getPath() {
    return this._event.path || "";
  }

  isBase64Encoded() {
    return this._event.isBase64Encoded;
  }

  toJSON() {
    return this._event;
  }
}

module.exports = { APIGEvent };
