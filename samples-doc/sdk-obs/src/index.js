const ObsClient = require("esdk-obs-nodejs");

class SampleEvent {
  constructor(event) {
    this._event = event || {};
  }

  getKey() {
    return this._event.key || "";
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

      logger.info("Buckets:");
      for (let i = 0; i < result.InterfaceResult.Buckets.length; i++) {
        const val = result.InterfaceResult.Buckets[i];
        logger.info(
          "Bucket[%d]-Name:%s,CreationDate:%s,Location: %s",
          i,
          val.BucketName,
          val.CreationDate,
          val.Location,
        );
      }
      return;
    }
    logger.info(
      "An ObsError was found, which means your request sent to OBS was rejected with an error response.",
    );
    logger.info("Status: %d", result.CommonMsg.Status);
    logger.info("Code: %s", result.CommonMsg.Code);
    logger.info("Message: %s", result.CommonMsg.Message);
    logger.info("RequestId: %s", result.CommonMsg.RequestId);
  } catch (error) {
    logger.info(
      "An Exception was found, which means the client encountered an internal problem when attempting to communicate with OBS, for example, the client was unable to access the network.",
    );
    logger.info(error);
  }
}

exports.handler = async function (event, context, callback) {
  const error = null;

  const logger = context.getLogger();

  logger.info("Function name:", context.getFunctionName());

  const sampleEvent = new SampleEvent(event);

  logger.info("Key value from event:", sampleEvent.getKey());

  // Create an instance of ObsClient.
  const obsClient = new ObsClient({
    access_key_id: context.getSecurityAccessKey(),
    secret_access_key: context.getSecuritySecretKey(),
    security_token: context.getSecurityToken(),
    // Enter the endpoint corresponding to the region where the bucket is located.
    server: "https://obs.otc.t-systems.com",
  });

   await listBuckets(obsClient, logger)
    .then(() => {})
    .catch((err) => {
      logger.info("Error in listBuckets: ", err);
    })
    .finally(() => {});

  // Close the ObsClient instance.
  obsClient.close();

  const output = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
    body: JSON.stringify(event),
  };
  callback(error, output);
};
