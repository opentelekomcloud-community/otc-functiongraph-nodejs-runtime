const ObsClient = require("esdk-obs-nodejs");

class SampleEvent {
  constructor(event) {
    this._event = event || {};
  }

  getKey() {
    return this._event.key || this._event.Key || "";
  }
}

exports.initializer = function (context, callback) {
  callback(null, "");
};

async function listBuckets(obsClient, logger) {
  try {
    const params = {
      // Specify whether to query the bucket location in the listing.
      // The default value is false. true is used in this example.
      QueryLocation: true,
      // Specify a bucket type (object buckets in this example).
      // If this parameter is not specified, object buckets and parallel file systems are listed by default.
      BucketType: "OBJECT",
    };
    // List buckets.

    const result = await obsClient.listBuckets(params);
    if (result.CommonMsg.Status <= 300) {
      return result.InterfaceResult.Buckets.map((val) => ({
        BucketName: val.BucketName,
        CreationDate: val.CreationDate,
        Location: val.Location,
      }));
    }
    logger.info(
      "OBS rejected with error response: status %s, code: %s, message: %s",
      result.CommonMsg.Status,
      result.CommonMsg.Code,
      result.CommonMsg.Message,
    );

    const error = new Error(
      `OBS rejected with error response: status ${result.CommonMsg.Status}, code: ${result.CommonMsg.Code}, message: ${result.CommonMsg.Message}`,
    );

    throw error;
  } catch (error) {
    logger.info(error);
    throw error;
  }
}

exports.handler = async function (event, context, callback) {
  const logger = context.getLogger();

  const sampleEvent = new SampleEvent(event);

  logger.info("Key value from event:", sampleEvent.getKey());

  const obsEndpoint =
    context.getUserData("OBS_ENDPOINT") || "https://obs.otc.t-systems.com";

  // Create an instance of ObsClient.
  const obsClient = new ObsClient({
    access_key_id: context.getSecurityAccessKey(),
    secret_access_key: context.getSecuritySecretKey(),
    security_token: context.getSecurityToken(),
    // Enter the endpoint corresponding to the region where the bucket is located.
    server: obsEndpoint,
  });

  let data = [];
  try {
    data = await listBuckets(obsClient, logger);
  } catch (err) {
    logger.info("Error in listBuckets: ", err);
    callback(err);
    return;
  } finally {
    obsClient.close();
  }

  const output = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
    body: JSON.stringify(data),
  };
  callback(null, output);
};
