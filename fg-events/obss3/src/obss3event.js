/**
 * OBS S3 Event Class
 * Represents an Object Storage Service (OBS) S3 event for FunctionGraph
 */
class OBSS3Event {
  constructor(event) {
    this._event = event || {};

    this._records = [];
    for (const record of this._event.Records || []) {
      this._records.push(new OBSS3Record(record));
    }
  }

  /**
   * Get the record array
   * @returns {Array} Array of event records
   */
  getRecords() {
    return this._records;
  }

  /**
   * Convert the event back to JSON
   * @returns {Object} Event as JSON object
   */
  toJSON() {
    return this._event;
  }

}

class OBSS3Record {
  constructor(record) {
    this._record = record || {};
  }

  /**
   * Get event version
   * @returns {string} Event version
   */
  getEventVersion() {
    return this._record.eventVersion || "";
  }

  /**
   * Get event time
   * @returns {string} Event time (ISO 8601 format)
   */
  getEventTime() {
    return this._record.eventTime || "";
  }

  /**
   * Get request parameters
   * @returns {Object} Request parameters object
   */
  getRequestParameters() {
    return new RequestParameters(this._record.requestParameters);
  }

  /**
   * Get S3 details
   * @returns {Object} S3 details object
   */
  getS3() {
    return new S3Details(this._record.s3);
  }

  /**
   * Get AWS region
   * @returns {string} AWS region
   */
  getAwsRegion() {
    return this._record.awsRegion || "";
  }

  /**
   * Get event name
   * @returns {string} Event name (e.g., "ObjectCreated:Post")
   */
  getEventName() {
    return this._record.eventName || "";
  }

  /**
   * Get user identity
   * @returns {Object} User identity object
   */
  getUserIdentity() {
    return new UserIdentity(this._record.userIdentity);
  }

  /**
   * Convert the record back to JSON
   * @returns {Object} Record as JSON object
   */
  toJSON() {
    return this._record;
  }
}

class RequestParameters {
  constructor(params) {
    this._params = params || {};
  }

  /**
   * Get source IP address
   * @returns {string} Source IP address
   */
  getSourceIPAddress() {
    return this._params.sourceIPAddress || "";
  }

  /**
   * Convert to JSON
   * @returns {Object} Request parameters as JSON object
   */
  toJSON() {
    return this._params;
  }
}

class S3Details {
  constructor(s3) {
    this._s3 = s3 || {};
  }

  /**
   * Get configuration ID
   * @returns {string} Configuration ID
   */
  getConfigurationId() {
    return this._s3.configurationId || "";
  }

  /**
   * Get object details
   * @returns {Object} Object details
   */
  getObject() {
    return new S3Object(this._s3.object);
  }

  /**
   * Get bucket details
   * @returns {Object} Bucket details
   */
  getBucket() {
    return new S3Bucket(this._s3.bucket);
  }

  /**
   * Convert to JSON
   * @returns {Object} S3 details as JSON object
   */
  toJSON() {
    return this._s3;
  }
}

class S3Object {
  constructor(obj) {
    this._obj = obj || {};
  }

  /**
   * Get object ETag
   * @returns {string} ETag
   */
  getETag() {
    return this._obj.eTag || "";
  }

  /**
   * Get sequencer
   * @returns {string} Sequencer
   */
  getSequencer() {
    return this._obj.sequencer || "";
  }

  /**
   * Get object key (filename)
   * @returns {string} Object key
   */
  getKey() {
    return this._obj.key || "";
  }

  /**
   * Get object size in bytes
   * @returns {number} Object size
   */
  getSize() {
    return this._obj.size || 0;
  }

  /**
   * Convert to JSON
   * @returns {Object} Object details as JSON object
   */
  toJSON() {
    return this._obj;
  }
}

class S3Bucket {
  constructor(bucket) {
    this._bucket = bucket || {};
  }

  /**
   * Get bucket ARN
   * @returns {string} Bucket ARN
   */
  getArn() {
    return this._bucket.arn || "";
  }

  /**
   * Get bucket name
   * @returns {string} Bucket name
   */
  getName() {
    return this._bucket.name || "";
  }

  /**
   * Get owner identity
   * @returns {Object} Owner identity
   */
  getOwnerIdentity() {
    return new OwnerIdentity(this._bucket.ownerIdentity);
  }

  /**
   * Convert to JSON
   * @returns {Object} Bucket details as JSON object
   */
  toJSON() {
    return this._bucket;
  }
}

class OwnerIdentity {
  constructor(identity) {
    this._identity = identity || {};
  }

  /**
   * Get principal ID
   * @returns {string} Principal ID
   */
  getPrincipalId() {
    return this._identity.PrincipalId || "";
  }

  /**
   * Convert to JSON
   * @returns {Object} Owner identity as JSON object
   */
  toJSON() {
    return this._identity;
  }
}

class UserIdentity {
  constructor(identity) {
    this._identity = identity || {};
  }

  /**
   * Get principal ID
   * @returns {string} Principal ID
   */
  getPrincipalId() {
    return this._identity.principalId || "";
  }

  /**
   * Convert to JSON
   * @returns {Object} User identity as JSON object
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
