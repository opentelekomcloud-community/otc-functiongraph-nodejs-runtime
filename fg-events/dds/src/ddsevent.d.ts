/**
 * TypeScript definitions for DDS Event
 * DDS trigger event for FunctionGraph
 */

export interface DDSJSON {
  /** Size of payload in bytes */
  size_bytes?: number;
  /** Raw token JSON string */
  token?: string;
  /** Raw full document JSON value */
  full_document?: string | Record<string, unknown>;
  /** Raw namespace JSON value */
  ns?: string | Record<string, unknown>;
}

export interface DDSRecordJSON {
  event_source?: string;
  event_version?: string;
  event_name?: string;
  event_source_ip?: string;
  region?: string;
  dds?: DDSJSON;
}

export interface DDSEventJSON {
  records?: DDSRecordJSON[];
}

export declare class DDSEvent {
  constructor(event?: DDSEventJSON);

  /** Get all event records */
  getRecords(): DDSRecord[];

  /** Get a single record by index, or null if not found */
  getRecord(index: number): DDSRecord | null;

  /** Convert the event back to JSON */
  toJSON(): DDSEventJSON;
}

export declare class DDSRecord {
  constructor(record?: DDSRecordJSON);

  /** Get event source */
  getEventSource(): string;

  /** Get event version */
  getEventVersion(): string;

  /** Get event name */
  getEventName(): string;

  /** Get event source IP */
  getEventSourceIp(): string;

  /** Get region */
  getRegion(): string;

  /** Get DDS payload wrapper */
  getDDS(): DDS;

  /** Convert the record back to JSON */
  toJSON(): DDSRecordJSON;
}

export declare class DDS {
  constructor(dds?: DDSJSON);

  /** Get payload size in bytes */
  getSizeBytes(): number;

  /** Get raw token string */
  getTokenRaw(): string;

  /** Get token parsed as an object */
  getToken(): Record<string, unknown>;

  /** Get raw full document value */
  getFullDocumentRaw(): string | Record<string, unknown>;

  /** Get full document parsed as an object */
  getFullDocument(): Record<string, unknown>;

  /** Get raw namespace value */
  getNSRaw(): string | Record<string, unknown>;

  /** Get namespace parsed as an object */
  getNS(): Record<string, unknown>;

  /** Convert the DDS payload back to JSON */
  toJSON(): DDSJSON;
}
