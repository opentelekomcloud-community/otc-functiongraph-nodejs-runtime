"use strict";

function loggingMiddleware(req, res, next) {
  // Header names are case-insensitive; Express normalizes them.
  const requestId = req.get("X-Cff-Request-Id") || "no-request-id";

  // Function to format timestamp as yyyy-mm-ddThh:mm:ss.SSSZ
  const getTimestamp = () => {
    // "YYYY-MM-DDTHH:mm:ss.SSS[Z]
    return new Date().toISOString();
  };

  // Save on request for later use
  req.cffRequestId = requestId || null;

  // Optional: expose it back in response for tracing
  if (requestId) {
    res.set("x-cff-request-id", requestId);
  }

  const logLevel = (process.env.RUNTIME_LOG_LEVEL || "DEBUG").toUpperCase(); // Default to debug if not set
  
  // Create a contextual logger that includes timestamp and request ID
  req.logger = {
    log: (...args) => console.log(`${getTimestamp()} [LOG] [${requestId}]`, ...args),
    debug: (...args) => {
      if (["DEBUG"].includes(logLevel)) {
        console.debug(`${getTimestamp()} [DEBUG] [${requestId}]`, ...args);
      }
    },
    info: (...args) => {
      if (["DEBUG", "INFO"].includes(logLevel)) {
        console.info(`${getTimestamp()} [INFO] [${requestId}]`, ...args);
      }
    },
    warn: (...args) => {
      if (["DEBUG", "INFO", "WARN"].includes(logLevel)) {
        console.warn(`${getTimestamp()} [WARN] [${requestId}]`, ...args);
      }
    },
    error: (...args) => {
      if (["DEBUG", "INFO", "WARN", "ERROR"].includes(logLevel)) {
        console.error(`${getTimestamp()} [ERROR] [${requestId}]`, ...args);
      }
    },
  };

  next();
}

module.exports = { loggingMiddleware };
