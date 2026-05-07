# SMN Event

Package contains SMN trigger event structure used in T Cloud Public FunctionGraph.

For details and usage see: [SMN Event Source](https://opentelekomcloud-community.github.io/otc-functiongraph-nodejs-runtime/devguide/event_function/trigger_events/trigger_smn_event.html)

## Code Assist (JSDoc)

```javascript
const { SMNEvent } = require("@opentelekomcloud-community/fg-smn-event");
/** @typedef {import("@opentelekomcloud-community/fg-smn-event").SMNEventJSON} SMNEventJSON */

/**
 * @param {SMNEventJSON} event
 */
exports.handler = async (event, context) => {
	const eventData = new SMNEvent(event);
	return "OK";
};
```