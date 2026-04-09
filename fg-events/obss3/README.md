# OBSS3 Event

Package contains OBSS3 trigger event structure used in T Cloud Public FunctionGraph.

For details and usage see: [OBS Event Source](https://opentelekomcloud-community.github.io/otc-functiongraph-nodejs-runtime/devguide/event_function/trigger_events/trigger_obs_event.html)

## Code Assist (JSDoc)

```javascript
const { OBSS3Event } = require("@opentelekomcloud-community/fg-obss3-event");
/** @typedef {import("@opentelekomcloud-community/fg-obss3-event").OBSS3EventJSON} OBSS3EventJSON */

/**
 * @param {OBSS3EventJSON} event
 */
exports.handler = async (event, context) => {
	const eventData = new OBSS3Event(event);
	return "OK";
};
```