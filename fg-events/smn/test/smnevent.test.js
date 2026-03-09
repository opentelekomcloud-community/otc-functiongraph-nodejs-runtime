const assert = require("assert");
const { SMNEvent } = require("smn-event");
const smnEventData = require("../resources/smnevent.json");

const event = new SMNEvent(smnEventData);

assert.strictEqual(event.getFunctionName(), "test");
assert.strictEqual(event.getRequestId(), "7c307f6a-cf68-4e65-8be0-4c77405a1b2c");

const records = event.getRecords();
assert.strictEqual(records.length, 2);
assert.strictEqual(records[0].getEventSource(), "smn");

const body = records[0].getSMNBody();
assert.strictEqual(body.getMessageId(), "a51671f77d4a479cacb09e2cd591a983");
assert.strictEqual(body.toJSON().topic_urn, "topicUrn");

console.log("smn-event tests passed");
