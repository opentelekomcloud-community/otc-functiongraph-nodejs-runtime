"use strict";

/**
 * @typedef {Object} APIGResponseJSON
 * @property {number} [statusCode]
 * @property {string} [body]
 * @property {Object} [headers]
 * @property {boolean} [isBase64Encoded]
 */

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

module.exports = { APIGResponse };
