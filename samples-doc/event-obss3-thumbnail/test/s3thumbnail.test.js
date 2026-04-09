const globalAgent = require('global-agent');
if (!process.env.GLOBAL_AGENT_HTTP_PROXY) {
  process.env.GLOBAL_AGENT_HTTP_PROXY =
    process.env.HTTPS_PROXY || process.env.HTTP_PROXY || '';
}
process.env.GLOBAL_AGENT_FORCE_GLOBAL_AGENT = 'true';
globalAgent.bootstrap();

const { Context } = require("@opentelekomcloud-community/fg-runtime");
const { getTempAKSK } = require("@opentelekomcloud-community/fg-testutils");
const { handler } = require("../src/s3thumbnail");


const event = {
  Records: [
    {
      eventVersion: "2.0",
      eventSource: "obs",
      eventTime: "2025-10-24T08:30:00+08:00",
      eventName: "ObjectCreated:PutObject",
      awsRegion: "eu-de",
      userIdentity: {
        principalId: "EXAMPLE",
      },
      requestParameters: {
        sourceIPAddress: "EXAMPLE",
      },
      s3: {
        configurationId: "testConfigRule",
        bucket: {
          name: "nodejs-event-s3obs-thumbnail-images",
          ownerIdentity: {
            principalId: "EXAMPLE",
          },
          arn: "opentelekomcloud_s3_bucket.inbucket.arn",
        },
        object: {
          key: "otc.jpg",
          size: 1024,
          eTag: "0123456789abcdef0123456789abcdef",
          sequencer: "0A1B2C3D4E5F678901",
        },
      },
    },
  ],
};

async function runTest() {
  const creds = await getTempAKSK();

  const context = new Context({
    requestID: "test-request-id",
    funcEnv: {
      RUNTIME_FUNC_NAME: "event-s3obs-thumbnail",
      RUNTIME_PACKAGE: "default",
      RUNTIME_PROJECT_ID: process.env.OTC_SDK_PROJECTID,
      RUNTIME_FUNC_VERSION: "latest",
      RUNTIME_MEMORY: "128",
      RUNTIME_CPU: "1",
      RUNTIME_USERDATA:
        '{"OBS_ENDPOINT":"https://obs.otc.t-systems.com","OUTPUT_BUCKET":"nodejs-event-s3obs-thumbnail-images-output"}',
      RUNTIME_TIMEOUT: "5",
    },

    securityAccessKey: creds.ak,
    securitySecretKey: creds.sk,
    securityToken: creds.token,
    logger: console,
  });

  context.logger.info("Starting test");

  const callback = (error, result) => {
    // expect(error).toBeNull();
    // expect(result).toBeDefined();
    // expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    // expect(body).toEqual(event);
  };

  handler(event, context, callback);
}

// Run the examples
if (require.main === module) {
  runTest().catch(console.error);
}