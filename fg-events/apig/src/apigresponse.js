"use strict";

class APIGResponse {
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

  static fromJSON(json) {
    return new APIGResponse(
      json.statusCode,
      json.body,
      json.headers,
      json.isBase64Encoded,
    );
  }

  setStatusCode(statusCode) {
    this.statusCode = statusCode;
  }

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

  getRawBody() {
    return this.body;
  }

  getBody() {
    if (this.isBase64Encoded) {
        const buff = Buffer.from(this.body, "base64");
        return buff.toString("utf-8");   
    }
    return this.body;
  }

  getBodyParsed() {
    return JSON.parse(this.getBody());
  }

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
