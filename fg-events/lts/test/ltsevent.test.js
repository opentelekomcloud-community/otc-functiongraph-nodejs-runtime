const assert = require("assert");
const { LTSEvent } = require("fg-lts-event");

test("LTS event should correctly parse event data", () => {
  const ltsEventData = require("../resources/lts_event.json");

  const event = new LTSEvent(ltsEventData);
  const decoded = event.getData();
  const logs = event.getLogs();

  assert.strictEqual(typeof decoded, "string");
  assert.ok(decoded.length > 0);
  assert.ok(logs);

  const missingLts = new LTSEvent({});
  assert.strictEqual(missingLts.getRawData(), "");
});
