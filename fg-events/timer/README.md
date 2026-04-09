# Timer Event

Package contains Timer trigger event structure used in T Cloud Public FunctionGraph.

For details and usage see: [Timer Event Source](https://opentelekomcloud-community.github.io/otc-functiongraph-nodejs-runtime/devguide/event_function/trigger_events/trigger_timer_event.html)

## Code Assist (JSDoc)

```javascript
const { TimerEvent } = require("@opentelekomcloud-community/fg-timer-event");
/** @typedef {import("@opentelekomcloud-community/fg-timer-event").TimerEventJSON} TimerEventJSON */

/**
 * @param {TimerEventJSON} event
 */
exports.handler = async (event, context) => {
	const eventData = new TimerEvent(event);
	return "OK";
};
```