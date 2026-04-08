const assert = require("assert");
const { APIGEvent } = require("fg-apig-event");


test("APIGEvent should correctly parse event data", () => {
  const apigEventData = require("../resources/apig_event.json");
  const event = new APIGEvent(apigEventData);
  assert.strictEqual(event.getBody(), '{"name": "OpenTelekomCloud"}');
  assert.strictEqual(event.getRawBody(), '{"name": "OpenTelekomCloud"}');
});

test("APIGEvent should handle base64 encoded body", () => {
  const apigEventData2 = require("../resources/apig_base64_event.json");
  const base64Event = new APIGEvent(apigEventData2);
  assert.strictEqual(base64Event.getBody(), '{"name": "OpenTelekomCloud"}');


  const missingBase64Body = new APIGEvent({ isBase64Encoded: true });
  assert.strictEqual(missingBase64Body.getBody(), "");

});
