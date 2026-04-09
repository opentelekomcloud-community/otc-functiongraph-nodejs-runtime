"use strict";

/**
 * @typedef {Object} CTSSessionContextAttributesJSON
 * @property {string} [created_at]
 * @property {boolean | string} [mfa_authenticated]
 */

class CTSSessionContextAttributes {
  /**
   * @param {CTSSessionContextAttributesJSON} sessionAttributes
   */
  constructor(sessionAttributes) {
    this._sessionAttributes = sessionAttributes || {};
  }

  /**
   * Time when the temporary security credential was issued.
   */
  getCreatedAt() {
    return this._sessionAttributes.created_at || "";
  }
  /**
   * Whether MFA identity authentication has been passed.
   */
  get MFAAuthenticated() {
    return this._sessionAttributes.mfa_authenticated || "";
  }

  /**
   * @returns {CTSSessionContextAttributesJSON}
   */
  toJSON() {
    return this._sessionAttributes;
  }
}

module.exports = { CTSSessionContextAttributes };
