const { randomUUID } = require('crypto');

const { Context } = require("fg-runtime");
const { handler } = require("../src/index");


async function runTest() {

  const context = new Context({
    requestID: randomUUID(),
    funcEnv: {
      RUNTIME_FUNC_NAME: "cts-test",
      RUNTIME_PACKAGE: "default",
      RUNTIME_PROJECT_ID: process.env.OTC_SDK_PROJECTID,
      RUNTIME_FUNC_VERSION: "latest",
      RUNTIME_MEMORY: "128",
      RUNTIME_CPU: "1",
      RUNTIME_TIMEOUT: "5",
      RUNTIME_USERDATA: JSON.stringify({
        PGHOST: "localhost",
        PGPORT: "5430",
        PGDATABASE: "netflix",
        PGUSER: "postgres",
        PGPASSWORD: "postgres",
      }),
    },

  });

  const result = await handler({}, context);

  console.log("Result:", result);
}

// Run the examples
if (require.main === module) {
  runTest().catch(console.error);
}