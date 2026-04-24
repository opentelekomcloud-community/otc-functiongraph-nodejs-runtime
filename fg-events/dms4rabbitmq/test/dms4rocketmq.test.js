const assert = require("assert");
const { DMS4RabbitMQEvent } = require("../src/index");

const eventData = require("../resources/rabbitmq_event.json");
const event = new DMS4RabbitMQEvent(eventData);

test("DMS4RabbitMQEvent should correctly parse event data", () => {
  assert.strictEqual(event.getTriggerType(), "RABBITMQ");
  assert.strictEqual(event.getEventVersion(), "v1.0");

  const records = event.getRecords();
  assert.strictEqual(records.length, 1);
  assert.strictEqual(records[0].getExchange(), "topic");

  const messages = records[0].getMessages();
  assert.strictEqual(messages.length, 5);
  assert.strictEqual(messages[0].getMessage(), "rabbitmq message1");
});
