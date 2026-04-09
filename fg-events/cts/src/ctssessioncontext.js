"use strict";
const { CTSSessionContextAttributes } = require("./ctssessioncontextattibutes");

/**
 * @typedef {Object} CTSSessionContextAttributesJSON
 * @property {string} [created_at]
 * @property {boolean | string} [mfa_authenticated]
 */

/**
 * @typedef {Object} CTSSessionContextJSON
 * @property {CTSSessionContextAttributesJSON} [attributes]
 */

class CTSSessionContext {
  /**
   * @param {CTSSessionContextJSON} sessionContext
   */
  constructor(sessionContext) {
    this._sessionContext = sessionContext || {};
  }

  /**
   * @returns {CTSSessionContextAttributes}
   */
  getAttributes() {
    return new CTSSessionContextAttributes(this._sessionContext.attributes);
  }

  /**
   * @returns {CTSSessionContextJSON}
   */
  toJSON() {
    return this._sessionContext;
  }
}

module.exports = { CTSSessionContext };
