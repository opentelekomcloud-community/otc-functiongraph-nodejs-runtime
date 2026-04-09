"use strict";
const { CTSEvent } = require("./ctsevent");
const { CTSUserInfo } = require("./ctsuserinfo");
const { CTSBaseUserDomain } = require("./ctsbaseuserdomain");
const { CTSSessionContext } = require("./ctssessioncontext");
const { CTSSessionContextAttributes } = require("./ctssessioncontextattibutes");

/**
 * Public type exports for editor IntelliSense in downstream JavaScript projects.
 * @typedef {import("./ctsevent").CTSEventJSON} CTSEventJSON
 * @typedef {import("./ctsevent").CTSEventDataJSON} CTSEventDataJSON
 * @typedef {import("./ctsevent").CTSUserInfoJSON} CTSUserInfoJSON
 * @typedef {import("./ctsevent").CTSSessionContextJSON} CTSSessionContextJSON
 * @typedef {import("./ctsevent").CTSSessionContextAttributesJSON} CTSSessionContextAttributesJSON
 * @typedef {import("./ctsevent").CTSBaseUserDomainJSON} CTSBaseUserDomainJSON
 */

module.exports = {
  CTSEvent,
  CTSUserInfo,
  CTSBaseUserDomain,
  CTSSessionContext,
  CTSSessionContextAttributes,
};
