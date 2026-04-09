# LTS Event

Package contains LTS trigger event structure used in T Cloud Public FunctionGraph.

For details and usage see: [LTS Event Source](https://opentelekomcloud-community.github.io/otc-functiongraph-nodejs-runtime/devguide/event_function/trigger_events/trigger_lts_event.html)

## Code Assist (JSDoc)

```javascript
const { LTSEvent } = require("@opentelekomcloud-community/fg-lts-event");
/** @typedef {import("@opentelekomcloud-community/fg-lts-event").LTSEventJSON} LTSEventJSON */

/**
 * @param {LTSEventJSON} event
 */
exports.handler = async (event, context) => {
	const eventData = new LTSEvent(event);
	return "OK";
};
```