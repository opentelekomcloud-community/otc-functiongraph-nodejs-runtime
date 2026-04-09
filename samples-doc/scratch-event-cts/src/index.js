const { CTSEvent } = require("@opentelekomcloud-community/fg-cts-event");

exports.initializer = function (context, callback) {
  const logger = context.getLogger();
  logger.info("Function initialized");
  callback(null, "");
};

exports.handler = async function (event, context) {
  const logger = context.getLogger();

  logger.info("Function Name:", context.getFunctionName());

  const ctsEvent = new CTSEvent(event);

  logger.info("CTS Event- Trace type:", ctsEvent.getTraceType());
  logger.info("CTS Event- Service type:", ctsEvent.getServiceType());

  const output = {
    service_type: ctsEvent.getServiceType(),
    trace_type: ctsEvent.getTraceType(),
    trace_name: ctsEvent.getTraceName(),
  };

  return output;
};
