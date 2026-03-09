const assert = require("assert");
const { DMS4KafkaEvent } = require("dms4kafka-event");

const eventData = require("../resources/dms4kafka_event.json");
const event = new DMS4KafkaEvent(eventData);

assert.strictEqual(event.getTriggerType(), "KAFKA");
assert.strictEqual(event.getEventVersion(), "v1.0");

const records = event.getRecords();
assert.strictEqual(records.length, 1);
assert.strictEqual(records[0].getTopic(), "topic-test");

const messages = records[0].getMessages();
assert.strictEqual(messages.length, 5);
assert.strictEqual(messages[0].getMessage(), "kafka message1");

console.log("dms4kafka-event tests passed");
