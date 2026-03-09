/**
 * APIGEvent Class
 * Represents an API Gateway event for FunctionGraph
 */
class APIGEvent {
  constructor(event) {
    this._event = event || {};
  }

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

    return body ?? "";
  }

  getRawBody() {
    return this._event.body ?? "";
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

class APIGRequestContext {
  constructor(requestContext) {
    this._requestContext = requestContext || {};
  }

  getAPIId() {
    return this._requestContext.apiId || "";
  }
  getRequestId() {
    return this._requestContext.requestId || "";
  }
  getStage() {
    return this._requestContext.stage || {};
  }

  toJSON() {
    return this._requestContext;
  }
}

module.exports = {
  APIGEvent,
  APIGRequestContext,
};
