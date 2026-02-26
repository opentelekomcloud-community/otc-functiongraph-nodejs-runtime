const { TimerEvent} = require("../timerevent");

const timerEventData = require("./timer_event.json");


const s = new TimerEvent(timerEventData);

console.log(s.getVersion());
console.log(s.getTime());
console.log(s.getTriggerType());
console.log(s.getTriggerName());
console.log(s.getUserEvent());

const userEvent = s.getUserEventParsed();

console.log("Message:" + userEvent.message);

console.log(JSON.stringify(s));

console.log("------------------------------");

const timerEventData2 = require("./timer_event_txt.json");
const s2 = new TimerEvent(timerEventData2);

console.log(s2.getUserEvent());
const userEvent2 = s2.getUserEventParsed(); 

console.log(userEvent2);
