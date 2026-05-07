import * as assert from "assert";
import type { TimerEventData } from "../src/timerevent";

const { TimerEvent } = require("timer-event");

const timerEventData = require("../../resources/timer_event.json") as TimerEventData;
const event = new TimerEvent(timerEventData);
assert.strictEqual(event.getVersion(), "v1.0");
assert.strictEqual(event.getTriggerType(), "TIMER");
assert.strictEqual(event.getTriggerName(), "Timer_001");

const parsed = event.getUserEventParsed() as { message?: string } | undefined;
assert.ok(parsed);
assert.strictEqual(parsed?.message, "timer triggered event");

const timerEventData2 = require("../../resources/timer_event_txt.json") as TimerEventData;
const textEvent = new TimerEvent(timerEventData2);
assert.strictEqual(textEvent.getUserEvent(), "Hello world");
assert.strictEqual(textEvent.getUserEventParsed(), undefined);

console.log("timer-event TypeScript tests passed");
