const { LTSEvent } = require("lts-event");

exports.initializer = function (context, callback) {
  const logger = context.getLogger();
  logger.info("Function initialized");
  callback(null, "");
};

exports.handler = async function (event, context) {
  const logger = context.getLogger();

  logger.info("Function Name:", context.getFunctionName());

  const ltsEvent = new LTSEvent(event);

  logger.info("LTS Event- Data:", ltsEvent.getLogs());
  

  const output = {
    data: ltsEvent.getLogs(),
  };

  return output;
};
