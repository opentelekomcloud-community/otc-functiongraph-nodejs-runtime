const { DDSEvent } = require("@opentelekomcloud-community/fg-dds-event");

exports.initializer = function (context, callback) {
  const logger = context.getLogger();
  logger.info("Function initialized");
  callback(null, "");
};

exports.handler = async function (event, context) {
  const logger = context.getLogger();

  logger.info("Function Name:", context.getFunctionName());

  const ddsEvent = new DDSEvent(event);

  const records = ddsEvent.getRecords();
  logger.info("DDS Event- Number of records:", records.length);

  records.forEach((record, index) => {
    logger.info(`DDS Event- Record ${index + 1}:`, record);
  });


  return "OK";
};
