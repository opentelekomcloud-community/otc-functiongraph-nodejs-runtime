/**
 * TypeScript definitions for OBS S3 Event
 * Object Storage Service (OBS) S3 event for FunctionGraph
 */

/**
 * Owner identity information
 */
export interface OwnerIdentityData {
  /** Principal ID of the bucket owner */
  PrincipalId: string;
}

/**
 * User identity information
 */
export interface UserIdentityData {
  /** Principal ID of the user */
  principalId: string;
}

/**
 * Request parameters
 */
export interface RequestParametersData {
  /** Source IP address of the request */
  sourceIPAddress: string;
}

/**
 * S3 object details
 */
export interface S3ObjectData {
  /** Entity tag of the object */
  eTag: string;
  /** Sequencer to determine event order */
  sequencer: string;
  /** Object key (filename) */
  key: string;
  /** Object size in bytes */
  size: number;
}

/**
 * S3 bucket details
 */
export interface S3BucketData {
  /** Amazon Resource Name of the bucket */
  arn: string;
  /** Bucket name */
  name: string;
  /** Owner identity information */
  ownerIdentity: OwnerIdentityData;
}

/**
 * S3 event details
 */
export interface S3DetailsData {
  /** Configuration ID that triggered the event */
  configurationId: string;
  /** Object details */
  object: S3ObjectData;
  /** Bucket details */
  bucket: S3BucketData;
}

/**
 * Individual OBS S3 event record
 */
export interface OBSS3RecordData {
  /** Version of the event format */
  eventVersion: string;
  /** ISO 8601 timestamp when the event occurred */
  eventTime: string;
  /** Request parameters */
  requestParameters: RequestParametersData;
  /** S3 event details */
  s3: S3DetailsData;
  /** AWS region where the event occurred */
  awsRegion: string;
  /** Name of the event (e.g., "ObjectCreated:Post") */
  eventName: string;
  /** User identity information */
  userIdentity: UserIdentityData;
}

/**
 * Complete OBS S3 event structure passed to FunctionGraph
 */
export interface OBSS3EventData {
  /** Array of OBS S3 event records */
  Records: OBSS3RecordData[];
}

/**
 * OwnerIdentity class for accessing owner identity data
 */
export declare class OwnerIdentity {
  constructor(identity: OwnerIdentityData);
  
  /** Get principal ID */
  getPrincipalId(): string;
  
  /** Convert to JSON */
  toJSON(): OwnerIdentityData;

}

/**
 * UserIdentity class for accessing user identity data
 */
export declare class UserIdentity {
  constructor(identity: UserIdentityData);
  
  /** Get principal ID */
  getPrincipalId(): string;
  
  /** Convert to JSON */
  toJSON(): UserIdentityData;
}

/**
 * RequestParameters class for accessing request parameters
 */
export declare class RequestParameters {
  constructor(params: RequestParametersData);
  
  /** Get source IP address */
  getSourceIPAddress(): string;
  
  /** Convert to JSON */
  toJSON(): RequestParametersData;
}

/**
 * S3Object class for accessing object details
 */
export declare class S3Object {
  constructor(obj: S3ObjectData);
  
  /** Get object ETag */
  getETag(): string;
  
  /** Get sequencer */
  getSequencer(): string;
  
  /** Get object key (filename) */
  getKey(): string;
  
  /** Get object size in bytes */
  getSize(): number;
  
  /** Convert to JSON */
  toJSON(): S3ObjectData;
}

/**
 * S3Bucket class for accessing bucket details
 */
export declare class S3Bucket {
  constructor(bucket: S3BucketData);
  
  /** Get bucket ARN */
  getArn(): string;
  
  /** Get bucket name */
  getName(): string;
  
  /** Get owner identity */
  getOwnerIdentity(): OwnerIdentity;
  
  /** Convert to JSON */
  toJSON(): S3BucketData;
}

/**
 * S3Details class for accessing S3 event details
 */
export declare class S3Details {
  constructor(s3: S3DetailsData);
  
  /** Get configuration ID */
  getConfigurationId(): string;
  
  /** Get object details */
  getObject(): S3Object;
  
  /** Get bucket details */
  getBucket(): S3Bucket;
  
  /** Convert to JSON */
  toJSON(): S3DetailsData;
}

/**
 * OBSS3Record class for accessing individual record data
 */
export declare class OBSS3Record {
  constructor(record: OBSS3RecordData);
  
  /** Get event version */
  getEventVersion(): string;
  
  /** Get event time */
  getEventTime(): string;
  
  /** Get request parameters */
  getRequestParameters(): RequestParameters;
  
  /** Get S3 details */
  getS3(): S3Details;
  
  /** Get AWS region */
  getAwsRegion(): string;
  
  /** Get event name */
  getEventName(): string;
  
  /** Get user identity */
  getUserIdentity(): UserIdentity;
  
  /** Convert to JSON */
  toJSON(): OBSS3RecordData;
}

/**
 * OBSS3Event class for processing OBS S3 events
 */
export declare class OBSS3Event {
  constructor(event: OBSS3EventData);
  
  /** Get the array of event records */
  getRecords(): OBSS3Record[];
  
  /** Convert to JSON */
  toJSON(): OBSS3EventData;
}
