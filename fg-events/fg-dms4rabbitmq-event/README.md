# DMS for RabbitMQ Event

Package contains DMS for RabbitMQ trigger event structure used in T Cloud Public FunctionGraph.

For details and usage see: [DMS for RabbitMQ Event Source](https://opentelekomcloud-community.github.io/otc-functiongraph-nodejs-runtime/devguide/event_function/trigger_events/trigger_dms4rabbitmq_event.html)

## Code Assist (JSDoc)

```javascript
const { DMS4RabbitMQEvent } = require("@opentelekomcloud-community/fg-dms4rabbitmq-event");
/** @typedef {import("@opentelekomcloud-community/fg-dms4rabitmq-event").DMS4RabbitMQEventJSON} DMS4RabbitMQEventJSON */

/**
 * @param {DMS4RabbitMQEventJSON} event
 */
exports.handler = async (event, context) => {
	const eventData = new DMS4RabbitMQEvent(event);
	return "OK";
};
```