const { DMS4RocketMQEvent } = require("@opentelekomcloud-community/fg-dms4rocketmq-event");

/**
 * 
 * @param {DMS4RocketMQEventJSON} event 
 * @param {*} context 
 * @returns {Promise<string>}
 */
exports.handler = async (event, context) => {
  let log = context.getLogger();
  log.info("RocketMQ messages received event:", event);

  const eventData = new DMS4RocketMQEvent(event);

  log.info("Trigger type:", eventData.getTriggerType());

  const records = eventData.getRecords();
  log.info("Records length:", records.length);

  return "OK";
};
