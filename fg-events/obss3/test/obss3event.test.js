const assert = require("assert");
const { OBSS3Event } = require("obss3-event");

test("OBSS3Event should correctly parse event data", () => {
  const obss3EventData = require("../resources/obss3_event.json");

  const event = new OBSS3Event(obss3EventData);
  const records = event.getRecords();
  assert.strictEqual(records.length, 1);

  const record = records[0];
  assert.strictEqual(record.getEventVersion(), "2.0");
  assert.strictEqual(record.getEventName(), "ObjectCreated:Post");
  assert.strictEqual(record.getAwsRegion(), "region");
  assert.strictEqual(
    record.getRequestParameters().getSourceIPAddress(),
    "103.218.216.125",
  );
  assert.strictEqual(
    record.getUserIdentity().getPrincipalId(),
    "9bf43789b1ff4b679040f35cc4f0dc05",
  );

  const s3 = record.getS3();
  assert.strictEqual(
    s3.getConfigurationId(),
    "UK1DGFPYUKUZFHNQ00000160CC0B471D101ED30CE24DF4DB",
  );
  assert.strictEqual(s3.getObject().getKey(), "job.png");
  assert.strictEqual(s3.getObject().getSize(), 777835);
  assert.strictEqual(s3.getBucket().getName(), "functionstorage-template");
  assert.strictEqual(
    s3.getBucket().getOwnerIdentity().getPrincipalId(),
    "0ed1b73473f24134a478962e631651eb",
  );

  assert.ok(Array.isArray(event.toJSON().Records));
});
