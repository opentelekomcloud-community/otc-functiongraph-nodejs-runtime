/**
 * TypeScript definitions for DMS4Kafka Event
 * DMS for Kafka trigger event for FunctionGraph
 */

export interface DMS4KafkaRecordMessageObject {
  message?: string;
}

export type DMS4KafkaRecordMessageJSON = string | DMS4KafkaRecordMessageObject;

export interface DMS4KafkaRecordJSON {
  topic_id?: string;
  messages?: DMS4KafkaRecordMessageJSON[];
}

export interface DMS4KafkaEventJSON {
  event_version?: string;
  event_time?: string;
  region?: string;
  trigger_type?: string;
  instance_id?: string;
  records?: DMS4KafkaRecordJSON[];
}

export declare class DMS4KafkaEvent {
  constructor(event?: DMS4KafkaEventJSON);

  getEventVersion(): string;
  getEventTime(): string;
  getRegion(): string;
  getTriggerType(): string;
  getInstanceId(): string;
  getRecords(): DMS4KafkaRecord[];
  toJSON(): DMS4KafkaEventJSON;
}

export declare class DMS4KafkaRecord {
  constructor(record?: DMS4KafkaRecordJSON);

  getTopicId(): string;
  getMessages(): DMS4KafkaRecordMessage[];
  toJSON(): DMS4KafkaRecordJSON;
}

export declare class DMS4KafkaRecordMessage {
  constructor(record?: DMS4KafkaRecordMessageJSON);

  getMessage(): string;
  toJSON(): DMS4KafkaRecordMessageJSON;
}
