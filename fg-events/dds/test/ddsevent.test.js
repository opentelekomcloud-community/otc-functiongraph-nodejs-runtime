const assert = require("assert");
const { DDSEvent } = require("../src/index");

test("DDSEvent should correctly parse event data", () => {
  const eventData = require("../resources/dds_event.json");
  const { testEnvironment } = require("../../cts/jest.config");
  const event = new DDSEvent(eventData);
  const records = event.getRecords();

  assert.strictEqual(records.length, 1);
  assert.strictEqual(records[0].getEventSource(), "dds");
  assert.strictEqual(records[0].getEventVersion(), "1.0");
  assert.strictEqual(records[0].getEventName(), "insert");
  assert.strictEqual(records[0].getRegion(), "region");

  const dds = records[0].getDDS();
  assert.ok(dds.getToken()._data.includes("825D8C2F4D"));
  assert.strictEqual(dds.getFullDocument().name, "dds");
  assert.strictEqual(dds.getNS().db, "functiongraph");

  assert.strictEqual(event.getRecord(1), null);
});
