/**
 * TypeScript definitions for SMN Event
 * SMN trigger event for FunctionGraph
 */

/**
 * SMN payload content
 */
export interface SMNBodyJSON {
  topic_urn?: string;
  timestamp?: string;
  message_attributes?: Record<string, unknown> | null;
  message?: string;
  type?: string;
  message_id?: string;
  subject?: string;
}

/**
 * Single SMN event record
 */
export interface SMNRecordJSON {
  event_subscription_urn?: string;
  event_source?: string;
  smn?: SMNBodyJSON;
}

/**
 * Complete SMN event structure passed to FunctionGraph
 */
export interface SMNEventJSON {
  record?: SMNRecordJSON[];
  functionname?: string;
  requestId?: string;
  timestamp?: string;
}

/**
 * SMNEvent class for processing SMN trigger events
 */
export declare class SMNEvent {
  constructor(event?: SMNEventJSON);

  /** Get event records */
  getRecords(): SMNRecord[];

  /** Get function name */
  getFunctionName(): string;

  /** Get request ID */
  getRequestId(): string;

  /** Get event timestamp */
  getTimestamp(): string;

  /** Convert the event back to JSON */
  toJSON(): SMNEventJSON;
}

/**
 * SMN record wrapper class
 */
export declare class SMNRecord {
  constructor(record?: SMNRecordJSON);

  /** Get event subscription URN */
  getEventSubscriptionUrn(): string;

  /** Get event source */
  getEventSource(): string;

  /** Get SMN body wrapper */
  getSMNBody(): SMNBody;

  /** Convert the record back to JSON */
  toJSON(): SMNRecordJSON;
}

/**
 * SMN body wrapper class
 */
export declare class SMNBody {
  constructor(smn?: SMNBodyJSON);

  /** Get topic URN */
  getTopicUrn(): string;

  /** Get SMN timestamp */
  getTimestamp(): string;

  /** Get message attributes */
  getMessageAttributes(): Record<string, unknown> | null | undefined;

  /** Get message content */
  getMessage(): string;

  /** Get message type */
  getType(): string;

  /** Get message ID */
  getMessageId(): string;

  /** Get message subject */
  getSubject(): string;

  /** Convert the body back to JSON */
  toJSON(): SMNBodyJSON;
}
