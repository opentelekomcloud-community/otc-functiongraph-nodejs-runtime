/**
 * TypeScript definitions for Kafka Open Source Event
 * Kafka Open Source trigger event for FunctionGraph
 */

export interface KafkaOpenSourceRecordMessageObject {
  message?: string;
}

export type KafkaOpenSourceRecordMessageJSON =
  | string
  | KafkaOpenSourceRecordMessageObject;

export interface KafkaOpenSourceRecordJSON {
  topic_id?: string;
  messages?: KafkaOpenSourceRecordMessageJSON[];
}

export interface KafkaOpenSourceEventJSON {
  event_version?: string;
  event_time?: string;
  region?: string;
  trigger_type?: string;
  instance_id?: string;
  records?: KafkaOpenSourceRecordJSON[];
}

export declare class KafkaOpenSourceEvent {
  constructor(event?: KafkaOpenSourceEventJSON);

  getEventVersion(): string;
  getEventTime(): string;
  getRegion(): string;
  getTriggerType(): string;
  getInstanceId(): string;
  getRecords(): KafkaOpenSourceRecord[];
  toJSON(): KafkaOpenSourceEventJSON;
}

export declare class KafkaOpenSourceRecord {
  constructor(record?: KafkaOpenSourceRecordJSON);

  getTopicId(): string;
  getMessages(): KafkaOpenSourceRecordMessage[];
  toJSON(): KafkaOpenSourceRecordJSON;
}

export declare class KafkaOpenSourceRecordMessage {
  constructor(record?: KafkaOpenSourceRecordMessageJSON);

  getMessage(): string;
  toJSON(): KafkaOpenSourceRecordMessageJSON;
}
