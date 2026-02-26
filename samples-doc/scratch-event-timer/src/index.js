const { TimerEvent } = require("timer-event");

exports.initializer = function (context, callback) {
  callback(null, "");
};

exports.handler = function (event, context, callback) {
  const logger = context.getLogger();

  console.log(context.getFunctionName());

  const timerEvent = new TimerEvent(event);

  logger.info("Timer Event:", timerEvent.getTriggerName());

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
