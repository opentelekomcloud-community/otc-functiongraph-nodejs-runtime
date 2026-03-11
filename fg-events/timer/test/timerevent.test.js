const assert = require("assert");
const { TimerEvent } = require("timer-event");

test("TimerEvent should correctly parse event data", () => {
  const timerEventData = require("../resources/timer_event.json");
  const event = new TimerEvent(timerEventData);
  assert.strictEqual(event.getVersion(), "v1.0");
  assert.strictEqual(event.getTriggerType(), "TIMER");
  assert.strictEqual(event.getTriggerName(), "Timer_001");
  assert.strictEqual(
    event.getUserEventParsed().message,
    "timer triggered event",
  );

  const timerEventData2 = require("../resources/timer_event_txt.json");
  const textEvent = new TimerEvent(timerEventData2);
  assert.strictEqual(textEvent.getUserEvent(), "Hello world");
  assert.strictEqual(textEvent.getUserEventParsed(), undefined);
});
