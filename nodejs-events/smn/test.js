const { SMNEvent, SMNRecord, SMNBody } = require("./smnevent");
const smnEventData = require("./smnevent.json");

console.log("Hello World");

const s = new SMNEvent(smnEventData);

console.log(s.getFunctionName());
console.log(s.getRequestId());
console.log(s.getTimestamp());

const records = s.getRecords();

for (const record of records) {
  console.log(record);

  console.log(record.getEventSubscriptionUrn());

  console.log(record.getSMNBody().getMessageId());
}

console.log("------------------------------");

console.log(JSON.stringify(s));
