"use strict";

/**
 * @typedef {Object} OBSS3UserIdentityJSON
 * @property {string} [principalId]
 */

/**
 * @typedef {Object} OBSS3OwnerIdentityJSON
 * @property {string} [PrincipalId]
 */

/**
 * @typedef {Object} OBSS3BucketJSON
 * @property {string} [arn]
 * @property {string} [name]
 * @property {OBSS3OwnerIdentityJSON} [ownerIdentity]
 */

/**
 * @typedef {Object} OBSS3ObjectJSON
 * @property {string} [eTag]
 * @property {string} [sequencer]
 * @property {string} [key]
 * @property {number} [size]
 */

/**
 * @typedef {Object} OBSS3DetailsJSON
 * @property {string} [configurationId]
 * @property {OBSS3ObjectJSON} [object]
 * @property {OBSS3BucketJSON} [bucket]
 */

/**
 * @typedef {Object} OBSS3RequestParametersJSON
 * @property {string} [sourceIPAddress]
 */

/**
 * @typedef {Object} OBSS3RecordJSON
 * @property {string} [eventVersion]
 * @property {string} [eventTime]
 * @property {OBSS3RequestParametersJSON} [requestParameters]
 * @property {OBSS3DetailsJSON} [s3]
 * @property {string} [awsRegion]
 * @property {string} [eventName]
 * @property {OBSS3UserIdentityJSON} [userIdentity]
 */

/**
 * @typedef {Object} OBSS3EventJSON
 * @property {OBSS3RecordJSON[]} [Records]
 */
/**
 * OBS S3 Event Class
 * Represents an Object Storage Service (OBS) S3 event for FunctionGraph
 */
class OBSS3Event {
  /**
   * @param {OBSS3EventJSON} event
   */
  constructor(event) {
    this._event = event || {};

    this._records = [];
    for (const record of this._event.Records || []) {
      this._records.push(new OBSS3Record(record));
    }
  }

  /**
   * Returns the event records.
   * @returns {OBSS3Record[]} Array of event records
   */
  getRecords() {
    return this._records;
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {OBSS3EventJSON} Payload as JSON object
   */
  toJSON() {
    return this._event;
  }

}

class OBSS3Record {
  /**
   * @param {OBSS3RecordJSON} record
   */
  constructor(record) {
    this._record = record || {};
  }

  /**
   * Returns the event version.
   * @returns {string} Event version
   */
  getEventVersion() {
    return this._record.eventVersion || "";
  }

  /**
   * Returns the event time.
   * @returns {string} Event time (ISO 8601 format)
   */
  getEventTime() {
    return this._record.eventTime || "";
  }

  /**
   * Returns the request parameters.
   * @returns {RequestParameters} Request parameters object
   */
  getRequestParameters() {
    return new RequestParameters(this._record.requestParameters);
  }

  /**
   * Returns the S3 details.
   * @returns {S3Details} S3 details object
   */
  getS3() {
    return new S3Details(this._record.s3);
  }

  /**
   * Returns the AWS region.
   * @returns {string} AWS region
   */
  getAwsRegion() {
    return this._record.awsRegion || "";
  }

  /**
   * Returns the event name.
   * @returns {string} Event name (e.g., "ObjectCreated:Post")
   */
  getEventName() {
    return this._record.eventName || "";
  }

  /**
   * Returns the user identity.
   * @returns {UserIdentity} User identity object
   */
  getUserIdentity() {
    return new UserIdentity(this._record.userIdentity);
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {OBSS3RecordJSON} Payload as JSON object
   */
  toJSON() {
    return this._record;
  }
}

class RequestParameters {
  /**
   * @param {OBSS3RequestParametersJSON} params
   */
  constructor(params) {
    this._params = params || {};
  }

  /**
   * Returns the source IP address.
   * @returns {string} Source IP address
   */
  getSourceIPAddress() {
    return this._params.sourceIPAddress || "";
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {OBSS3RequestParametersJSON} Payload as JSON object
   */
  toJSON() {
    return this._params;
  }
}

class S3Details {
  /**
   * @param {OBSS3DetailsJSON} s3
   */
  constructor(s3) {
    this._s3 = s3 || {};
  }

  /**
   * Returns the configuration ID.
   * @returns {string} Configuration ID
   */
  getConfigurationId() {
    return this._s3.configurationId || "";
  }

  /**
   * Returns the object details.
   * @returns {S3Object} Object details
   */
  getObject() {
    return new S3Object(this._s3.object);
  }

  /**
   * Returns the bucket details.
   * @returns {S3Bucket} Bucket details
   */
  getBucket() {
    return new S3Bucket(this._s3.bucket);
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {OBSS3DetailsJSON} Payload as JSON object
   */
  toJSON() {
    return this._s3;
  }
}

class S3Object {
  /**
   * @param {OBSS3ObjectJSON} obj
   */
  constructor(obj) {
    this._obj = obj || {};
  }

  /**
   * Returns the object ETag.
   * @returns {string} ETag
   */
  getETag() {
    return this._obj.eTag || "";
  }

  /**
   * Returns the sequencer.
   * @returns {string} Sequencer
   */
  getSequencer() {
    return this._obj.sequencer || "";
  }

  /**
   * Returns the object key.
   * @returns {string} Object key
   */
  getKey() {
    return this._obj.key || "";
  }

  /**
   * Returns the object size.
   * @returns {number} Object size
   */
  getSize() {
    return this._obj.size || 0;
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {OBSS3ObjectJSON} Payload as JSON object
   */
  toJSON() {
    return this._obj;
  }
}

class S3Bucket {
  /**
   * @param {OBSS3BucketJSON} bucket
   */
  constructor(bucket) {
    this._bucket = bucket || {};
  }

  /**
   * Returns the bucket ARN.
   * @returns {string} Bucket ARN
   */
  getArn() {
    return this._bucket.arn || "";
  }

  /**
   * Returns the bucket name.
   * @returns {string} Bucket name
   */
  getName() {
    return this._bucket.name || "";
  }

  /**
   * Returns the owner identity.
   * @returns {OwnerIdentity} Owner identity
   */
  getOwnerIdentity() {
    return new OwnerIdentity(this._bucket.ownerIdentity);
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {OBSS3BucketJSON} Payload as JSON object
   */
  toJSON() {
    return this._bucket;
  }
}

class OwnerIdentity {
  /**
   * @param {OBSS3OwnerIdentityJSON} identity
   */
  constructor(identity) {
    this._identity = identity || {};
  }

  /**
   * Returns the principal ID.
   * @returns {string} Principal ID
   */
  getPrincipalId() {
    return this._identity.PrincipalId || "";
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {OBSS3OwnerIdentityJSON} Payload as JSON object
   */
  toJSON() {
    return this._identity;
  }
}

class UserIdentity {
  /**
   * @param {OBSS3UserIdentityJSON} identity
   */
  constructor(identity) {
    this._identity = identity || {};
  }

  /**
   * Returns the principal ID.
   * @returns {string} Principal ID
   */
  getPrincipalId() {
    return this._identity.principalId || "";
  }

  /**
   * Converts the wrapped payload back to a plain JSON object.
   * @returns {OBSS3UserIdentityJSON} Payload as JSON object
   */
  toJSON() {
    return this._identity;
  }
}

module.exports = {
  OBSS3Event,
  OBSS3Record,
  RequestParameters,
  S3Details,
  S3Object,
  S3Bucket,
  OwnerIdentity,
  UserIdentity
};
