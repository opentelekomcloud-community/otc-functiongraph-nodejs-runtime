# DDS Event

Package contains DDS trigger event structure used in T Cloud Public FunctionGraph.

For details and usage see: [DDS Event Source](https://opentelekomcloud-community.github.io/otc-functiongraph-nodejs-runtime/devguide/event_function/trigger_events/trigger_dds_event.html)

## Code Assist (JSDoc)

```javascript
const { DDSEvent } = require("@opentelekomcloud-community/fg-dds-event");
/** @typedef {import("@opentelekomcloud-community/fg-dds-event").DDSEventJSON} DDSEventJSON */

/**
 * @param {DDSEventJSON} event
 */
exports.handler = async (event, context) => {
	const eventData = new DDSEvent(event);
	return "OK";
};
```
