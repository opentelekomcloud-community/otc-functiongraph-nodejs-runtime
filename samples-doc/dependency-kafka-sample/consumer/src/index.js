const { DMS4KafkaEvent } = require("@opentelekomcloud-community/fg-dms4kafka-event");

exports.handler = async (event, context) => {
  let log = context.getLogger();

  log.info("Kafka messages received event:", event);

  const eventData = new DMS4KafkaEvent(event);

  log.info("Trigger type:", eventData.getTriggerType());

  const records = event.getRecords();
  log.info("Records length:", records.length);

  return "OK";
};
