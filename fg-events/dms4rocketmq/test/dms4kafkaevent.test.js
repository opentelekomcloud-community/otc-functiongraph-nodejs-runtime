const assert = require("assert");
const { DMS4RocketMQEvent } = require("../src/dms4rocketmq");

const eventData = require("../resources/rocketmq_event.json");
const event = new DMS4RocketMQEvent(eventData);

assert.strictEqual(event.getTriggerType(), "ROCKETMQ");
assert.strictEqual(event.getEventVersion(), "v1.0");

const records = event.getRecords();
assert.strictEqual(records.length, 1);
assert.strictEqual(records[0].getTopic(), "topic");

const messages = records[0].getMessages();
assert.strictEqual(messages.length, 5);
assert.strictEqual(messages[0].getMessage(), "rocketmq message1");

console.log("dms4rocketmq-event tests passed");
