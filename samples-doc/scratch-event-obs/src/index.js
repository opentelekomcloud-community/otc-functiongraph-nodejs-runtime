const { OBSS3Event } = require("fg-obss3-event");

exports.initializer = function (context, callback) {
  const logger = context.getLogger();
  logger.info("Function initialized");
  callback(null, "");
};

exports.handler = async function (event, context) {
  const logger = context.getLogger();

  logger.info("Function Name:", context.getFunctionName());

  const obss3Event = new OBSS3Event(event);

  logger.info("OBS Event- Name:", obss3Event.getRecords()[0].getEventName());
  logger.info("OBS Event- Bucket:", obss3Event.getRecords()[0].getS3().getBucket().getName());
  

  const output = {
    event_name: obss3Event.getRecords()[0].getEventName(),
    bucket_name: obss3Event.getRecords()[0].getS3().getBucket().getName()
  };

  return output;
};
