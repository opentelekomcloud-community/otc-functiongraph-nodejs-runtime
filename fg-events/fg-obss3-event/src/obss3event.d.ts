/**
 * TypeScript definitions for OBS S3 Event
 * OBS S3 trigger event for FunctionGraph
 */

export interface OBSS3UserIdentityJSON {
  principalId?: string;
}

export interface OBSS3OwnerIdentityJSON {
  PrincipalId?: string;
}

export interface OBSS3BucketJSON {
  arn?: string;
  name?: string;
  ownerIdentity?: OBSS3OwnerIdentityJSON;
}

export interface OBSS3ObjectJSON {
  eTag?: string;
  sequencer?: string;
  key?: string;
  size?: number;
}

export interface OBSS3DetailsJSON {
  configurationId?: string;
  object?: OBSS3ObjectJSON;
  bucket?: OBSS3BucketJSON;
}

export interface OBSS3RequestParametersJSON {
  sourceIPAddress?: string;
}

export interface OBSS3RecordJSON {
  eventVersion?: string;
  eventTime?: string;
  requestParameters?: OBSS3RequestParametersJSON;
  s3?: OBSS3DetailsJSON;
  awsRegion?: string;
  eventName?: string;
  userIdentity?: OBSS3UserIdentityJSON;
}

export interface OBSS3EventJSON {
  Records?: OBSS3RecordJSON[];
}

export declare class OBSS3Event {
  constructor(event?: OBSS3EventJSON);

  /** Get event records */
  getRecords(): OBSS3Record[];

  /** Convert the event back to JSON */
  toJSON(): OBSS3EventJSON;
}

export declare class OBSS3Record {
  constructor(record?: OBSS3RecordJSON);

  /** Get event version */
  getEventVersion(): string;

  /** Get event time (ISO 8601 format) */
  getEventTime(): string;

  /** Get request parameters */
  getRequestParameters(): RequestParameters;

  /** Get S3 details */
  getS3(): S3Details;

  /** Get AWS region */
  getAwsRegion(): string;

  /** Get event name (e.g. "ObjectCreated:Post") */
  getEventName(): string;

  /** Get user identity */
  getUserIdentity(): UserIdentity;

  /** Convert the record back to JSON */
  toJSON(): OBSS3RecordJSON;
}

export declare class RequestParameters {
  constructor(params?: OBSS3RequestParametersJSON);

  /** Get source IP address */
  getSourceIPAddress(): string;

  /** Convert back to JSON */
  toJSON(): OBSS3RequestParametersJSON;
}

export declare class S3Details {
  constructor(s3?: OBSS3DetailsJSON);

  /** Get configuration ID */
  getConfigurationId(): string;

  /** Get object details */
  getObject(): S3Object;

  /** Get bucket details */
  getBucket(): S3Bucket;

  /** Convert back to JSON */
  toJSON(): OBSS3DetailsJSON;
}

export declare class S3Object {
  constructor(obj?: OBSS3ObjectJSON);

  /** Get object ETag */
  getETag(): string;

  /** Get sequencer */
  getSequencer(): string;

  /** Get object key */
  getKey(): string;

  /** Get object size */
  getSize(): number;

  /** Convert back to JSON */
  toJSON(): OBSS3ObjectJSON;
}

export declare class S3Bucket {
  constructor(bucket?: OBSS3BucketJSON);

  /** Get bucket ARN */
  getArn(): string;

  /** Get bucket name */
  getName(): string;

  /** Get owner identity */
  getOwnerIdentity(): OwnerIdentity;

  /** Convert back to JSON */
  toJSON(): OBSS3BucketJSON;
}

export declare class OwnerIdentity {
  constructor(identity?: OBSS3OwnerIdentityJSON);

  /** Get principal ID */
  getPrincipalId(): string;

  /** Convert back to JSON */
  toJSON(): OBSS3OwnerIdentityJSON;
}

export declare class UserIdentity {
  constructor(identity?: OBSS3UserIdentityJSON);

  /** Get principal ID */
  getPrincipalId(): string;

  /** Convert back to JSON */
  toJSON(): OBSS3UserIdentityJSON;
}
