# FunctionGraph trigger event classes

Package contains all trigger event classes for use with FunctionGraph.


## Usage as npm dependency

```
npm install @opentelekomcloud-community/fg-events
```

Example usage:

```javascript
const { TimerEvent } = require("@opentelekomcloud-community/fg-events");

exports.handler = async (event, context) => {

  const logger = context.getLogger();

	const eventData = new TimerEvent(event);
  logger.info(e.getTriggerName());

	return "OK";
};
```


## Usage as FunctionGraph dependency
With `npm pack` created `opentelekomcloud-community-fg-events-[VERSION].zip` can be added as a dependency to FunctionGraph. see [Dependencies](https://opentelekomcloud-community.github.io/otc-functiongraph-nodejs-runtime/devguide/concepts/dependencies/_index.html).


Example usage:

```javascript
const { TimerEvent } = require("@opentelekomcloud-community/fg-timer-events");

exports.handler = async (event, context) => {

  const logger = context.getLogger();

	const eventData = new TimerEvent(event);
  logger.info(e.getTriggerName());

	return "OK";
};
```