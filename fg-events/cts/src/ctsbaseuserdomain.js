"use strict";

/**
 * @typedef {Object} CTSBaseUserDomainJSON
 * @property {string} [id]
 * @property {string} [name]
 */

class CTSBaseUserDomain {
  /**
   * @param {CTSBaseUserDomainJSON} userDomain
   */
  constructor(userDomain) {
    this._userDomain = userDomain || {};
  }

  /**
   * Account ID. To obtain it, hover over the username in the upper right corner of the console,
   * select My Credentials from the drop-down menu, and locate the ID on the right of Account ID.
   */
  getId() {
    return this._userDomain.id || "";
  }

  /**
   * Account name. To obtain it, hover over the username in the upper right corner of the console,
   * select My Credentials from the drop-down menu, and locate the name on the right of Account Name.
   */
  getName() {
    return this._userDomain.name || "";
  }

  /**
   * @returns {CTSBaseUserDomainJSON}
   */
  toJSON() {
    return this._userDomain;
  }
}

module.exports = { CTSBaseUserDomain };