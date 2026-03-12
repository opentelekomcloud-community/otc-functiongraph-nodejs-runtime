"use strict";
const { CTSSessionContextAttributes } = require("./ctssessioncontextattibutes");

class CTSSessionContext {
  constructor(sessionContext) {
    this._sessionContext = sessionContext || {};
  }

  getAttributes() {
    return new CTSSessionContextAttributes(this._sessionContext);
  }

  toJSON() {
    return this._sessionContext;
  }
}

module.exports = { CTSSessionContext };
