const assert = require("assert");
const { CTSEvent } = require("cts-event");

const ctsEventData = require("../resources/cts_event.json");
const event = new CTSEvent(ctsEventData);
assert.strictEqual(event.getUser().getId(), "5b726c4fbfd84821ba866bafaaf56aax");
assert.strictEqual(event.getUser().getName(), "userName");
assert.strictEqual(event.getUser().getDomain().getId(), "b2b3853af40448fcb9e40dxj89505ba");
assert.strictEqual(event.getUser().getDomain().getName(), "domainName");
assert.strictEqual(event.getServiceType(), "FunctionGraph");

const ctsEventData2 = require("../resources/cts_createFunction.json");
const createEvent = new CTSEvent(ctsEventData2);
assert.strictEqual(createEvent.getOperationId(), "CreateFunction");
assert.strictEqual(createEvent.getResourceID(), "test4");
assert.strictEqual(createEvent.getSourceIP(), "62.156.151.4");

const emptyEvent = new CTSEvent();
assert.strictEqual(emptyEvent.getServiceType(), "");

console.log("cts-event tests passed");