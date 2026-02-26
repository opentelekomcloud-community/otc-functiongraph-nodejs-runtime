const { Readable } = require("stream");

const util = require("util");
const sharp = require("sharp");
const ObsClient = require("esdk-obs-nodejs");
const { OBSS3Event } = require("obss3-event");

// Initializer
exports.initializer = function (context, callback) {
  callback(null, "");
};

// Handler
exports.handler = async function (event, context, callback) {
  const logger = context.getLogger();

  logger.info("Function name:", context.getFunctionName());

  logger.info("Event received:", util.inspect(event, { depth: 5 }));

  const obsEvent = new OBSS3Event(event);

  const srcBucket = obsEvent.getRecords()[0].getS3().getBucket().getName();
  const srcKey = obsEvent.getRecords()[0].getS3().getObject().getKey();

  const obsEndpoint = context.getUserData("OBS_ENDPOINT");
  const destBucket = context.getUserData("OUTPUT_BUCKET");
  const destKey = "thumb-" + srcKey;

  logger.info("Source bucket:", srcBucket);
  logger.info("Source key:", srcKey);
  logger.info("Destination bucket:", destBucket);
  logger.info("Destination key:", destKey);
  logger.info("OBS Endpoint:", obsEndpoint);

  // Infer the image type from the file suffix
  const typeMatch = srcKey.match(/\.([^.]*)$/);
  if (!typeMatch) {
    logger.info("Could not determine the image type.");
    return;
  }

  // Check that the image type is supported
  const imageType = typeMatch[1].toLowerCase();
  if (imageType !== "jpg" && imageType !== "png") {
    logger.info(`Unsupported image type: ${imageType}`);
    return;
  }

  // Create an instance of ObsClient.
  const obsClient = new ObsClient({
    access_key_id: context.getSecurityAccessKey(),
    secret_access_key: context.getSecuritySecretKey(),
    security_token: context.getSecurityToken(),
    // Enter the endpoint corresponding to the region where the bucket is located.
    server: obsEndpoint,
  });

  try {
    await shrink(obsClient, logger, srcBucket, srcKey, destBucket, destKey);
  } catch (err) {
    logger.info("Error in shrink: ", err);
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
    body: JSON.stringify(event),
  };
  callback(null, output);
};

async function shrink(
  obsClient,
  logger,
  srcBucket,
  srcKey,
  destBucket,
  destKey,
) {
  try {
    // Get the object from OBS.
    const getResult = await obsClient.getObject({
      Bucket: srcBucket,
      Key: srcKey,
      SaveAsStream: true,
    });

    if (getResult.CommonMsg.Status < 300) {
      logger.info("Object retrieved successfully.");

      const stream = getResult.InterfaceResult.Content;

      if (stream instanceof Readable) {
        logger.info("Content is a readable stream.");
        const contentBuffer = Buffer.concat(await stream.toArray());
      } else {
        logger.info("Content is not a readable stream.");
        return;
      }

      // Resize the image using sharp.
      const resizedImageBuffer = await sharp(contentBuffer)
        .resize(100, 100)
        .toBuffer();

      // Upload the resized image back to OBS.
      const putResult = await obsClient.putObject({
        Bucket: destBucket,
        Key: destKey,
        Body: Readable.from(resizedImageBuffer),
        ContentType: getResult.ContentType,
      });
      if (putResult.CommonMsg.Status < 300) {
        logger.info("Thumbnail created and uploaded successfully.");
        return;
      } else {
        logger.info(
          "Failed to upload the thumbnail. Status code:",
          putResult.CommonMsg.Status,
        );
      }
    } else {
      logger.info(
        "Failed to retrieve the object. Status code:",
        getResult.CommonMsg.Status,
      );
    }
  } catch (err) {
    logger.info(
      "An Exception was found, which means the client encountered an internal problem when attempting to communicate with OBS, for example, the client was unable to access the network.",
      err,
    );
  }
}
