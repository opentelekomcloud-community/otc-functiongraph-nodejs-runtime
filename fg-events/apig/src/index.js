"use strict";
const { APIGEvent } = require("./apigevent");
const { APIGRequestContext } = require("./apigrequestcontext");
const { APIGResponse } = require("./apigresponse");

/**
 * Public type exports for editor IntelliSense in downstream JavaScript projects.
 * @typedef {import("./apigevent").APIGEventJSON} APIGEventJSON
 * @typedef {import("./apigevent").APIGRequestContextJSON} APIGRequestContextJSON
 * @typedef {import("./apigresponse").APIGResponseJSON} APIGResponseJSON
 */

module.exports = {
  APIGEvent,
  APIGRequestContext,
  APIGResponse,
};
