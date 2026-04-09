"use strict";
const { SMNEvent, SMNRecord, SMNBody } = require("./smnevent");

/**
 * Public type exports for editor IntelliSense in downstream JavaScript projects.
 * @typedef {import("./smnevent").SMNEventJSON} SMNEventJSON
 * @typedef {import("./smnevent").SMNRecordJSON} SMNRecordJSON
 * @typedef {import("./smnevent").SMNBodyJSON} SMNBodyJSON
 */

module.exports = { SMNEvent, SMNRecord, SMNBody };
