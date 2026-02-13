const { TimerEvent } = require("timer-event");

exports.initializer = function (context, callback) {
  callback(null, "");
};

exports.handler = function (event, context, callback) {
  const error = null;
  
  console.log(context.getFunctionName());

  const timerEvent = new TimerEvent(event);

  const logger = context.getLogger();

  logger.info("Timer Event:", timerEvent.getTriggerName());

  const output = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
    body: JSON.stringify(event),
  };
  callback(error, output);
};
