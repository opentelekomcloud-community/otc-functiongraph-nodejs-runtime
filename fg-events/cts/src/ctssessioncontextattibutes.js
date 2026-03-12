"use strict";

class CTSSessionContextAttributes {
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

  toJSON() {
    return this._sessionAttributes;
  }
}

module.exports = { CTSSessionContextAttributes };
