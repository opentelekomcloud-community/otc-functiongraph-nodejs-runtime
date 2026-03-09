const { APIGEvent} = require("apig-event");

const apigEventData = require("../resources/apig_event.json");
const s = new APIGEvent(apigEventData);
console.log(s.getBody());


const apigEventData2 = require("../resources/apig_base64_event");
const s2 = new APIGEvent(apigEventData2);
console.log(s2.getBody());