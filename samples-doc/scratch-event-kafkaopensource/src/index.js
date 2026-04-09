const { KafkaOpenSourceEvent } = require("@opentelekomcloud-community/fg-kafkaopensource-event");

exports.initializer = function (context, callback) {
  const logger = context.getLogger();
  logger.info("Function initialized");
  callback(null, "");
};

exports.handler = async function (event, context) {
  const logger = context.getLogger();

  logger.info("Function Name:", context.getFunctionName());

  const kafkaEvent = new KafkaOpenSourceEvent(event);

  logger.info("Trigger type:", kafkaEvent.getTriggerType());
  
  const output = {  
    trigger_type: kafkaEvent.getTriggerType(),
  };

  return output;
};
