const { LTSEvent } = require("lts-event");

const ltsEventData = require("../resources/lts_event.json");


const s = new LTSEvent(ltsEventData);

console.log(s.getData());


console.log(s.getLogs());
