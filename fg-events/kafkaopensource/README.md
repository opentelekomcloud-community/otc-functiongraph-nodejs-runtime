# Kafka (OpenSource) Event

Package contains Kafka (Opensource) trigger event structure used in T Cloud Public FunctionGraph.

For details and usage see: [Kafka (OpenSource) Event Source](https://opentelekomcloud-community.github.io/otc-functiongraph-nodejs-runtime/devguide/event_function/trigger_events/trigger_kafkaopensource_event.html)

## Code Assist (JSDoc)

```javascript
const { KafkaOpenSourceEvent } = require("@opentelekomcloud-community/fg-kafkaopensource-event");
/** @typedef {import("@opentelekomcloud-community/fg-kafkaopensource-event").KafkaOpenSourceEventJSON} KafkaOpenSourceEventJSON */

/**
 * @param {KafkaOpenSourceEventJSON} event
 */
exports.handler = async (event, context) => {
	const eventData = new KafkaOpenSourceEvent(event);
	return "OK";
};
```