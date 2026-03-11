const { TimerEvent } = require("timer-event");

exports.initializer = function (context, callback) {
  const logger = context.getLogger();
  logger.info("Function initialized");
  callback(null, "");
};

exports.handler = async function (event, context, callback) {
  const logger = context.getLogger();

  logger.info("Function Name:", context.getFunctionName());

  const timerEvent = new TimerEvent(event);

  logger.info("Timer Event:", timerEvent.getTriggerName());

  const output = "ok";
  callback(null, output);
};
