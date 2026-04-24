const { DMS4RabbitMQEvent } = require("@opentelekomcloud-community/fg-dms4rabbitmq-event");

exports.initializer = function (context, callback) {
  const logger = context.getLogger();
  logger.info("Function initialized");
  callback(null, "");
};

exports.handler = async function (event, context) {
  const logger = context.getLogger();

  logger.info("Function Name:", context.getFunctionName());

  const dms = new DMS4RabbitMQEvent(event);

  logger.info("Trigger type:", dms.getTriggerType());
  
  const output = {  
    trigger_type: dms.getTriggerType(),
  };

  return output;
};
