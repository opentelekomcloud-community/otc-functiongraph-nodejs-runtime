const { DMS4RocketMQEvent} = require("../src/dms4rocketmq");

const eventData = require("../resources/dms4rocketmq_event.json");
const s = new DMS4RocketMQEvent(eventData);


console.log(s.getTriggerType());

console.log(s.getEventTime());

console.log(s.getRecords()[0].getTopicId());

console.log(s.getRecords()[0].getMessages());
