# DMS for Kafka Event

Package contains DMS for Kafka trigger event structure used in T Cloud Public FunctionGraph.

For details and usage see: [DMS for Kafka Event Source](https://opentelekomcloud-community.github.io/otc-functiongraph-nodejs-runtime/devguide/event_function/trigger_events/trigger_dms4kafka_event.html)

## Code Assist (JSDoc)

```javascript
const { DMS4KafkaEvent } = require("@opentelekomcloud-community/fg-dms4kafka-event");
/** @typedef {import("@opentelekomcloud-community/fg-dms4kafka-event").DMS4KafkaEventJSON} DMS4KafkaEventJSON */

/**
 * @param {DMS4KafkaEventJSON} event
 */
exports.handler = async (event, context) => {
	const eventData = new DMS4KafkaEvent(event);
	return "OK";
};
```