/**
 * TypeScript definitions for DMS4RocketMQ Event
 * DMS for RocketMQ trigger event for FunctionGraph
 */

export interface DMS4RocketMQRecordMessageObject {
  message?: string;
}

export type DMS4RocketMQRecordMessageJSON =
  | string
  | DMS4RocketMQRecordMessageObject;

export interface DMS4RocketMQRecordJSON {
  topic_id?: string;
  messages?: DMS4RocketMQRecordMessageJSON[];
}

export interface DMS4RocketMQEventJSON {
  event_version?: string;
  event_time?: string;
  region?: string;
  trigger_type?: string;
  instance_id?: string;
  records?: DMS4RocketMQRecordJSON[];
}

export declare class DMS4RocketMQEvent {
  constructor(event?: DMS4RocketMQEventJSON);

  getEventVersion(): string;
  getEventTime(): string;
  getRegion(): string;
  getTriggerType(): string;
  getInstanceId(): string;
  getRecords(): DMS4RocketMQRecord[];
  toJSON(): DMS4RocketMQEventJSON;
}

export declare class DMS4RocketMQRecord {
  constructor(record?: DMS4RocketMQRecordJSON);

  getTopicId(): string;
  getMessages(): DMS4RocketMQRecordMessage[];
  toJSON(): DMS4RocketMQRecordJSON;
}

export declare class DMS4RocketMQRecordMessage {
  constructor(record?: DMS4RocketMQRecordMessageJSON);

  getMessage(): string;
  toJSON(): DMS4RocketMQRecordMessageJSON;
}
