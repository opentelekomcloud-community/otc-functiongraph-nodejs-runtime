"use strict";
const { CTSBaseUserDomain } = require("./ctsbaseuserdomain");
const { CTSSessionContext } = require("./ctssessioncontext");

/**
 * @typedef {Object} CTSBaseUserDomainJSON
 * @property {string} [id]
 * @property {string} [name]
 */

/**
 * @typedef {Object} CTSSessionContextAttributesJSON
 * @property {string} [created_at]
 * @property {boolean | string} [mfa_authenticated]
 */

/**
 * @typedef {Object} CTSSessionContextJSON
 * @property {CTSSessionContextAttributesJSON} [attributes]
 */

/**
 * @typedef {Object} CTSUserInfoJSON
 * @property {string} [type]
 * @property {string} [principal_id]
 * @property {string} [principal_urn]
 * @property {string} [account_id]
 * @property {string} [access_key_id]
 * @property {string} [id]
 * @property {string} [name]
 * @property {CTSBaseUserDomainJSON} [domain]
 * @property {string} [user_name]
 * @property {boolean | string} [principal_is_root_user]
 * @property {string[]} [invoked_by]
 * @property {CTSSessionContextJSON} [session_context]
 * @property {string} [OriginUser]
 */


class CTSUserInfo {
  /**
   * @param {CTSUserInfoJSON} user
   */
  constructor(user) {
    this._user = user || {};
  }

  /**
   * Identity type of the operator.
   */
  getType() {
    return this._user.type || "";
  }

  /**
   * Identity ID of the operator.
   * - For an IAM user, the format is <user-id>.
   * - For an IAM assumed-agency session identity, the format is <agency-id>:<agency-session-name>.
   * - For an IAM federated identity, the format is <idp_id>:<user-session-name>.
   */
  getPrincipalId() {
    return this._user.principal_id || "";
  }

  /**
   * URN of the operator.
   * - For an IAM user, the format is iam::<account-id>:user:<user-name>.
   * - For an IAM agency session identity, the format is sts::<account-id>:assumed-agency:<agency-name>/<agency-session-name>.
   * - For an IAM federated identity, the format is sts::<account-id>:external-user:<idp_id>/<user-session-name>.
   */
  getPrincipalURN() {
    return this._user.principal_urn || "";
  }

  /**
   * Account ID. To obtain it, hover over the username in the upper right corner of the console,
   * select My Credentials from the drop-down menu, and locate the ID on the right of Account ID.
   */
  getAccountId() {
    return this._user.account_id || "";
  }

  /**
   * Access key ID.
   */
  getAccessKeyId() {
    return this._user.access_key_id || "";
  }

  /**
   * User ID. To obtain it, hover over the username in the upper right corner of the console,
   * select My Credentials from the drop-down menu, and locate the ID on the right of IAM User ID.
   */
  getId() {
    return this._user.id || "";
  }
  /**
   * Username. To obtain it, hover over the username in the upper right corner of the console,
   * select My Credentials from the drop-down menu, and locate the name on the right of IAM Username.
   */
  getName() {
    return this._user.name || "";
  }

  /**
   * Domain information of the user who performed the operation generating the trace.
   */
  /**
   * @returns {CTSBaseUserDomain}
   */
  getDomain() {
    return new CTSBaseUserDomain(this._user.domain);
  }

  /**
   * Username.
   * The meaning of user_name is the same as that of name.
   */
  getUserName() {
    return this._user.user_name || "";
  }

  /**
   * Whether the operator is user root.
   * If the value is true, the operator is user root.
   * If the value is false, the operator is an IAM user of an assumed-agency session identity,
   * federated identity, or a non-root user.
   */
  getPrincipalIsRootUser() {
    return this._user.principal_is_root_user || "";
  }

  /**
   * Name of the service that sends the request.
   * The value is ["service.console"] for console operations.
   */
  getInvokedBy() {
    return this._user.invoked_by || [];
  }

  /**
   * Temporary security credential attribute.
   */
  /**
   * @returns {CTSSessionContext}
   */
  getSessionContext() {
    return new CTSSessionContext(this._user.session_context);
  }

  /**
   * Information about the original user who initiates the assumed session.
   */
  getOriginUser() {
    return this._user.OriginUser || "";
  }

  /**
   * @returns {CTSUserInfoJSON}
   */
  toJSON() {
    return this._user;
  }
}

module.exports = { CTSUserInfo };
