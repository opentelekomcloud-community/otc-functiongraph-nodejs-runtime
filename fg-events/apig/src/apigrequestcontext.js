"use strict";
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
    return this._requestContext.stage || "";
  }

  toJSON() {
    return this._requestContext;
  }
}

module.exports = { APIGRequestContext };
