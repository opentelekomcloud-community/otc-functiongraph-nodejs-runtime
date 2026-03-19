const { DMS4KafkaEvent } = require("dms4kafka-event");

exports.initializer = function (context, callback) {
  const logger = context.getLogger();
  logger.info("Function initialized");
  callback(null, "");
};

exports.handler = async function (event, context) {
  const logger = context.getLogger();

  logger.info("Function Name:", context.getFunctionName());

  const kafkaEvent = new DMS4KafkaEvent(event);

  logger.info("Trigger type:", kafkaEvent.getTriggerType());
  
  const output = {  
    trigger_type: kafkaEvent.getTriggerType(),
  };

  return output;
};
