"use strict";
const { LTSEvent } = require("./ltsevent");

/**
 * Public type exports for editor IntelliSense in downstream JavaScript projects.
 * @typedef {import("./ltsevent").LTSEventJSON} LTSEventJSON
 * @typedef {import("./ltsevent").LTSEventPayload} LTSEventPayload
 */

module.exports = { LTSEvent };
