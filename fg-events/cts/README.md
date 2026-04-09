# CTS Event

Package contains CTS trigger event structure used in T Cloud Public FunctionGraph.

For details and usage see: [CTS Event Source](https://opentelekomcloud-community.github.io/otc-functiongraph-nodejs-runtime/devguide/event_function/trigger_events/trigger_cts_event.html)

## Code Assist (JSDoc)

```javascript
const { CTSEvent } = require("@opentelekomcloud-community/fg-cts-event");
/** @typedef {import("@opentelekomcloud-community/fg-cts-event").CTSEventJSON} CTSEventJSON */

/**
 * @param {CTSEventJSON} event
 */
exports.handler = async (event, context) => {
	const eventData = new CTSEvent(event);
	return "OK";
};
```