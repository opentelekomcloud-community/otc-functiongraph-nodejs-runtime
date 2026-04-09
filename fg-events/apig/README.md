# APIG Event

Package contains APIG trigger event structure used in T Cloud Public FunctionGraph.

For details and usage see: [APIG Event Source](https://opentelekomcloud-community.github.io/otc-functiongraph-nodejs-runtime/devguide/event_function/trigger_events/trigger_apig_event.html)

## Code Assist (JSDoc)

```javascript
const { APIGEvent } = require("@opentelekomcloud-community/fg-apig-event");
/** @typedef {import("@opentelekomcloud-community/fg-apig-event").APIGEventJSON} APIGEventJSON */

/**
 * @param {APIGEventJSON} event
 */
exports.handler = async (event, context) => {
	const eventData = new APIGEvent(event);
	
  return new APIGResponse(
      200,
      "Hello World",
      { "Content-Type": "text/html; charset=utf-8" },
      false,
    );
};
```