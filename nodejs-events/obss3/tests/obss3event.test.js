const { OBSS3Event } = require("../obss3event");
const obss3EventData = require("./obss3_event.json");

console.log("Testing OBS S3 Event Handler");

const event = new OBSS3Event(obss3EventData);

console.log("\n=== Event Records ===");
const records = event.getRecords();
console.log(`Number of records: ${records.length}`);

for (const record of records) {
  console.log("\n=== Record Details ===");
  console.log(`Event Version: ${record.getEventVersion()}`);
  console.log(`Event Name: ${record.getEventName()}`);
  console.log(`Event Time: ${record.getEventTime()}`);
  console.log(`AWS Region: ${record.getAwsRegion()}`);

  const requestParams = record.getRequestParameters();
  console.log(`Source IP: ${requestParams.getSourceIPAddress()}`);

  const userIdentity = record.getUserIdentity();
  console.log(`User Principal ID: ${userIdentity.getPrincipalId()}`);

  const s3 = record.getS3();
  console.log(`\n=== S3 Details ===`);
  console.log(`Configuration ID: ${s3.getConfigurationId()}`);

  const obj = s3.getObject();
  console.log(`\n=== Object Details ===`);
  console.log(`Key: ${obj.getKey()}`);
  console.log(`Size: ${obj.getSize()} bytes`);
  console.log(`ETag: ${obj.getETag()}`);
  console.log(`Sequencer: ${obj.getSequencer()}`);

  const bucket = s3.getBucket();
  console.log(`\n=== Bucket Details ===`);
  console.log(`Name: ${bucket.getName()}`);
  console.log(`ARN: ${bucket.getArn()}`);
  
  const ownerIdentity = bucket.getOwnerIdentity();
  console.log(`Owner Principal ID: ${ownerIdentity.getPrincipalId()}`);
}

console.log("\n=== JSON Output ===");
console.log(JSON.stringify(event.toJSON(), null, 2));

console.log("\n✅ Test completed successfully!");
