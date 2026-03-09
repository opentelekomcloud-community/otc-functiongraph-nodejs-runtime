const { DMS4KafkaEvent} = require("dms4kafka-event");

const eventData = require("../resources/dms4kafka_event.json");
const s = new DMS4KafkaEvent(eventData);


console.log(s.getTriggerType());

console.log(s.getEventTime());

console.log(s.getRecords()[0].getTopicId());

console.log(s.getRecords()[0].getMessages());
