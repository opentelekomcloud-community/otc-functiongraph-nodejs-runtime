/**
 * TypeScript definitions for SMN Event
 * Simple Message Notification event from FunctionGraph
 */

/**
 * SMN message body containing notification details
 */
export interface SMNBodyData {
  /** Topic URN of the SMN topic */
  topic_urn: string;
  /** ISO 8601 timestamp when the message was published */
  timestamp: string;
  /** Optional message attributes */
  message_attributes: Record<string, any> | null;
  /** The actual message content */
  message: string;
  /** Type of notification */
  type: string;
  /** Unique identifier for the message */
  message_id: string;
  /** Subject line of the message */
  subject: string;
}

/**
 * Individual SMN event record
 */
export interface SMNRecordData {
  /** Version of the event format */
  event_version: string;
  /** SMN message details */
  smn: SMNBodyData;
  /** URN of the event subscription/function */
  event_subscription_urn: string;
  /** Source of the event (always "smn" for SMN events) */
  event_source: string;
}

/**
 * Complete SMN event structure passed to FunctionGraph
 */
export interface SMNEventData {
  /** Array of SMN event records */
  record: SMNRecordData[];
  /** Name of the function being invoked */
  functionname: string;
  /** Unique request identifier */
  requestId: string;
  /** Timestamp when the event was received */
  timestamp: string;
}

/**
 * SMNBody class for accessing message details
 */
export declare class SMNBody {
  constructor(smn: SMNBodyData);
  
  /** Get SMN topic URN */
  getTopicUrn(): string;
  
  /** Get SMN timestamp */
  getTimestamp(): string;
  
  /** Get SMN message attributes */
  getMessageAttributes(): Record<string, any> | null;
  
  /** Get SMN message content */
  getMessage(): string;
  
  /** Get SMN type */
  getType(): string;
  
  /** Get SMN message ID */
  getMessageId(): string;
  
  /** Get SMN message subject */
  getSubject(): string;
  
  /** Convert the body back to JSON */
  toJSON(): SMNBodyData;
}

/**
 * SMNRecord class for accessing individual record data
 */
export declare class SMNRecord {
  constructor(record: SMNRecordData);
  
  /** Get event subscription URN */
  getEventSubscriptionUrn(): string;
  
  /** Get event source */
  getEventSource(): string;
  
  /** Get SMN details from record */
  getSMNBody(): SMNBody;
  
  /** Convert the record back to JSON */
  toJSON(): SMNRecordData;
}

/**
 * SMNEvent class for processing SMN events
 */
export declare class SMNEvent {
  constructor(event: SMNEventData);
  
  /** Get the array of event records */
  getRecords(): SMNRecord[];
  
  /** Get the function name */
  getFunctionName(): string;
  
  /** Get the request ID */
  getRequestId(): string;
  
  /** Get the timestamp */
  getTimestamp(): string;
  
  /** Convert the event back to JSON */
  toJSON(): SMNEventData;
}
