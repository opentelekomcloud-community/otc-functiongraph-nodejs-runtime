"use strict";
const moment = require("moment");

function loggingMiddleware(req, res, next) {
  // Header names are case-insensitive; Express normalizes them.
  const requestId = req.get("X-Cff-Request-Id") || "no-request-id";

  // Function to format timestamp as yyyymmddThh:mm:ss.SSSZ
  const getTimestamp = () => {
    return moment().utc().format("YYYYMMDDTHH:mm:ss.SSS[Z]");
  };

  // Save on request for later use
  req.cffRequestId = requestId || null;

  // Optional: expose it back in response for tracing
  if (requestId) {
    res.set("x-cff-request-id", requestId);
  }

    // Create a contextual logger that includes timestamp and request ID
  req.logger = {
    log: (...args) => console.log(`${getTimestamp()} [${requestId}]`, ...args),
    info: (...args) =>
      console.info(`${getTimestamp()} [INFO] [${requestId}]`, ...args),
    warn: (...args) =>
      console.warn(`${getTimestamp()} [WARN] [${requestId}]`, ...args),
    error: (...args) =>
      console.error(`${getTimestamp()} [ERROR] [${requestId}]`, ...args),
  };

  next();
}

module.exports = { loggingMiddleware };
