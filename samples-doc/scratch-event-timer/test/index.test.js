const { randomUUID } = require('crypto');

const { Context } = require("fg-runtime");
const { handler } = require("../src/index");

const event = require("../resources/test_event.json");

async function runTest() {

  const context = new Context({
    requestID: randomUUID(),
    funcEnv: {
      RUNTIME_FUNC_NAME: "timer-test",
      RUNTIME_PACKAGE: "default",
      RUNTIME_PROJECT_ID: process.env.OTC_SDK_PROJECTID,
      RUNTIME_FUNC_VERSION: "latest",
      RUNTIME_MEMORY: "128",
      RUNTIME_CPU: "1",
      RUNTIME_TIMEOUT: "5",
    },

  });

  const callback = (error, result) => {    

    console.log("Result:", result);
  };

  handler(event, context, callback);
}

// Run the examples
if (require.main === module) {
  runTest().catch(console.error);
}