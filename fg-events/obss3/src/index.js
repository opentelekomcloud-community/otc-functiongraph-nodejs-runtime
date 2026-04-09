"use strict";

const  {
  OBSS3Event,
  OBSS3Record,
  RequestParameters,
  S3Details,
  S3Object,
  S3Bucket,
  OwnerIdentity,
  UserIdentity
} = require("./obss3event");

/**
 * Public type exports for editor IntelliSense in downstream JavaScript projects.
 * @typedef {import("./obss3event").OBSS3EventJSON} OBSS3EventJSON
 * @typedef {import("./obss3event").OBSS3RecordJSON} OBSS3RecordJSON
 * @typedef {import("./obss3event").OBSS3RequestParametersJSON} OBSS3RequestParametersJSON
 * @typedef {import("./obss3event").OBSS3DetailsJSON} OBSS3DetailsJSON
 * @typedef {import("./obss3event").OBSS3ObjectJSON} OBSS3ObjectJSON
 * @typedef {import("./obss3event").OBSS3BucketJSON} OBSS3BucketJSON
 * @typedef {import("./obss3event").OBSS3OwnerIdentityJSON} OBSS3OwnerIdentityJSON
 * @typedef {import("./obss3event").OBSS3UserIdentityJSON} OBSS3UserIdentityJSON
 */

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