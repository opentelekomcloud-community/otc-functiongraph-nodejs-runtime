# DMS for RocketMQ Event

Package contains DMS for RocketMQ trigger event structure used in T Cloud Public FunctionGraph.

For details and usage see: [DMS for RocketMQ Event Source](https://opentelekomcloud-community.github.io/otc-functiongraph-nodejs-runtime/devguide/event_function/trigger_events/trigger_dms4rocketmq_event.html)

## Code Assist (JSDoc)

```javascript
const { DMS4RocketMQEvent } = require("@opentelekomcloud-community/fg-dms4rocketmq-event");
/** @typedef {import("@opentelekomcloud-community/fg-dms4rocketmq-event").DMS4RocketMQEventJSON} DMS4RocketMQEventJSON */

/**
 * @param {DMS4RocketMQEventJSON} event
 */
exports.handler = async (event, context) => {
	const eventData = new DMS4RocketMQEvent(event);
	return "OK";
};
```