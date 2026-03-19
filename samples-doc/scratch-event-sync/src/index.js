// filename: index.js
"use strict";

class SampleEvent {
  constructor(event) {
    this._event = event || {};
  }

  getKey() {
    return this._event.key || "";
  }
}

// FunctionGraph initializer (optional)
// initializer name: index.initializer
exports.initializer = function (context, callback) {
  const logger = context.getLogger();
  logger.info("initializing :", context.getFunctionName());

  callback(null, "");
};

// FunctionGraph handler
// handler name:  index.handler
exports.handler = function (event, context, callback) {
  const logger = context.getLogger();

  logger.info("Function name:", context.getFunctionName());

  const sampleEvent = new SampleEvent(event);

  logger.info("Key value from event:", sampleEvent.getKey());

  const output = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
    body: JSON.stringify(event),
  };
  callback(null, output);
};
