"use strict";
const { DDSEvent, DDSRecord, DDS } = require("./ddsevent");

/**
 * Public type exports for editor IntelliSense in downstream JavaScript projects.
 * @typedef {import("./ddsevent").DDSEventJSON} DDSEventJSON
 * @typedef {import("./ddsevent").DDSRecordJSON} DDSRecordJSON
 * @typedef {import("./ddsevent").DDSJSON} DDSJSON
 */

module.exports = { DDSEvent, DDSRecord, DDS };