class APIGEvent {
  constructor(event) {
    this._event = event || {};
  }

  getBody() {
    if (this._event.isBase64Encoded) {
      let buff = Buffer.from(this._event.body, "base64");
      let text = buff.toString("utf-8");
      return text;
    } else {
      return this._event.body || {};
    }
  }

  getRawBody() {
    return this._event.body || {};
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
}

module.exports = {
  APIGEvent,
  APIGRequestContext,
};
