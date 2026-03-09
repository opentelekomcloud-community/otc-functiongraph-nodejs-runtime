const { APIGEvent } = require("apig-event");

exports.initializer = function (context, callback) {
  const logger = context.getLogger();
  logger.info("Function initialized");
  callback(null, "");
};

exports.handler = function (event, context, callback) {
  const logger = context.getLogger();

  logger.info("Function Name:", context.getFunctionName());

  const apigEvent = new APIGEvent(event);

  logger.info("APIG Event body:", apigEvent.getBody());

  const output = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
    body: JSON.stringify(apigEvent.getBody()),
  };
  callback(null, output);
};
