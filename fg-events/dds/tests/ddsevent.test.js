const { DDSEvent} = require("dds-event");

const eventData = require("../resources/dds_event.json");


const d = new DDSEvent(eventData);

console.log(d.getRecord(1).getEventSource());

console.log(d.getRecords()[0].getEventVersion());

console.log(d.getRecords()[0].getEventName());

console.log(d.getRecords()[0].getEventSourceIp());

console.log(d.getRecords()[0].getRegion());

console.log(d.getRecords().map(record => record.getDDS().getFullDocument()));
