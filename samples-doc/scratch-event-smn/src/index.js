const { SMNEvent } = require("fg-smn-event");

exports.initializer = function (context, callback) {
  const logger = context.getLogger();
  logger.info("Function initialized");
  callback(null, "");
};

exports.handler = async function (event, context) {
  const logger = context.getLogger();

  logger.info("Function Name:", context.getFunctionName());

  const smnEvent = new SMNEvent(event);

  logger.info("Event- Name:", smnEvent.getFunctionName());
  logger.info("SubscriptionURN:", smnEvent.getRecords()[0].getEventSubscriptionUrn());
  
  const output = {
    event_name: smnEvent.getFunctionName(),
    subscription_urn: smnEvent.getRecords()[0].getEventSubscriptionUrn()
  };

  return output;
};
