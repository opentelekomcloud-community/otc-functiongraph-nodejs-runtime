const { CTSEvent} = require("cts-event");

const ctsEventData = require("../resources/cts_event.json");


const s = new CTSEvent(ctsEventData);

console.log(s.getUser().getId());
console.log(s.getUser().getName());
console.log(s.getUser().getDomain().getId());
console.log(s.getUser().getDomain().getName());

console.log(JSON.stringify(s));


const ctsEventData2 = require("../resources/cts_createFunction.json");
const s2 = new CTSEvent(ctsEventData2);
console.log(JSON.stringify(s2));