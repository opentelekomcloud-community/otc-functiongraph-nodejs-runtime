/**
 * TypeScript definitions for LTS Event
 * LTS trigger event for FunctionGraph
 */

export interface LTSEventPayload {
  /** Base64-encoded log data */
  data?: string;
}

export interface LTSEventJSON {
  lts?: LTSEventPayload;
}

export declare class LTSEvent {
  constructor(event?: LTSEventJSON);

  /** Get raw base64-encoded log data */
  getRawData(): string;

  /** Get log data decoded from base64 as a UTF-8 string */
  getData(): string;

  /** Get parsed log entries from the decoded data */
  getLogs(): Record<string, unknown>[];

  /** Convert the event back to JSON */
  toJSON(): LTSEventJSON;
}
