/**
 * TypeScript definitions for DMS4RabbitMQ Event
 * DMS for RabbitMQ trigger event for FunctionGraph
 */

export interface DMS4RabbitMQRecordMessageObject {
  message?: string;
}

export type DMS4RabbitMQRecordMessageJSON =
  | string
  | DMS4RabbitMQRecordMessageObject;

export interface DMS4RabbitMQRecordJSON {
  exchange?: string;
  messages?: DMS4RabbitMQRecordMessageJSON[];
}

export interface DMS4RabbitMQEventJSON {
  event_version?: string;
  event_time?: string;
  region?: string;
  trigger_type?: string;
  instance_id?: string;
  records?: DMS4RabbitMQRecordJSON[];
}

export declare class DMS4RabbitMQEvent {
  constructor(event?: DMS4RabbitMQEventJSON);

  getEventVersion(): string;
  getEventTime(): string;
  getRegion(): string;
  getTriggerType(): string;
  getInstanceId(): string;
  getRecords(): DMS4RabbitMQRecord[];
  toJSON(): DMS4RabbitMQEventJSON;
}

export declare class DMS4RabbitMQRecord {
  constructor(record?: DMS4RabbitMQRecordJSON);

  getExchange(): string;
  getMessages(): DMS4RabbitMQRecordMessage[];
  toJSON(): DMS4RabbitMQRecordJSON;
}

export declare class DMS4RabbitMQRecordMessage {
  constructor(record?: DMS4RabbitMQRecordMessageJSON);

  getMessage(): string;
  toJSON(): DMS4RabbitMQRecordMessageJSON;
}
