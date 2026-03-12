const globalAgent = require('global-agent');
if (!process.env.GLOBAL_AGENT_HTTP_PROXY) {
  process.env.GLOBAL_AGENT_HTTP_PROXY =
    process.env.HTTPS_PROXY || process.env.HTTP_PROXY || '';
}
process.env.GLOBAL_AGENT_FORCE_GLOBAL_AGENT = 'true';
globalAgent.bootstrap();

const { randomUUID } = require('crypto');
const { Context } = require("fg-runtime");
const { getTempAKSK } = require("fg-testutils");
const { handler } = require("../src/index");


const event = {
  "Key": "test",
};

async function runTest() {
  const creds = await getTempAKSK();

  const context = new Context({
    requestID: randomUUID(),
    funcEnv: {
      RUNTIME_FUNC_NAME: "sdk-obs",
      RUNTIME_PACKAGE: "default",
      RUNTIME_PROJECT_ID: process.env.OTC_SDK_PROJECTID,
      RUNTIME_FUNC_VERSION: "latest",
      RUNTIME_MEMORY: "128",
      RUNTIME_CPU: "1",
      RUNTIME_USERDATA:
        '{"OBS_ENDPOINT":"https://obs.otc.t-systems.com"}',
      RUNTIME_TIMEOUT: "5",
    },

    securityAccessKey: creds.ak,
    securitySecretKey: creds.sk,
    securityToken: creds.token,
    logger: console,
  });

  const callback = (error, result) => {    
    const body = JSON.parse(result.body);
    console.log("Response body:", body);
  };

  handler(event, context, callback);
}

// Run the examples
if (require.main === module) {
  runTest().catch(console.error);
}