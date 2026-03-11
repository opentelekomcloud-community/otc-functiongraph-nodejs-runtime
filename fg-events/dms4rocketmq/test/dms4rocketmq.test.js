const assert = require("assert");
const { DMS4RocketMQEvent } = require("dms4rocketmq-event");

const eventData = require("../resources/rocketmq_event.json");
const event = new DMS4RocketMQEvent(eventData);

test("DMS4RocketMQEvent should correctly parse event data", () => {
  assert.strictEqual(event.getTriggerType(), "ROCKETMQ");
  assert.strictEqual(event.getEventVersion(), "v1.0");

  const records = event.getRecords();
  assert.strictEqual(records.length, 1);
  assert.strictEqual(records[0].getTopicId(), "topic");

  const messages = records[0].getMessages();
  assert.strictEqual(messages.length, 5);
  assert.strictEqual(messages[0].getMessage(), "rocketmq message1");
});
