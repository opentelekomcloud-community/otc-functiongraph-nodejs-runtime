const assert = require("assert");
const { KafkaOpenSourceEvent } = require("fg-kafkaopensource-event");

test("KafkaOpenSourceEvent should correctly parse event data", () => {
  const eventData = require("../resources/kafkaopensource_event.json");
  const event = new KafkaOpenSourceEvent(eventData);

  assert.strictEqual(event.getTriggerType(), "KAFKA");
  assert.strictEqual(event.getEventVersion(), "v1.0");

  const records = event.getRecords();
  assert.strictEqual(records.length, 1);
  assert.strictEqual(records[0].getTopicId(), "topic-test");

  const messages = records[0].getMessages();
  assert.strictEqual(messages.length, 5);
  assert.strictEqual(messages[0].getMessage(), "kafka message1");
});
