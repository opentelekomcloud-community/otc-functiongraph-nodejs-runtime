const { randomUUID } = require("crypto");

const { Context } = require("@opentelekomcloud-community/fg-runtime");
const { handler, initializer, closePool } = require("../src/index_usepool");
const { exit } = require("process");

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

  // initializer uses a callback — wrap it in a promise so we can await it
  await new Promise((resolve, reject) => {
    initializer(context, async (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });


  const result = await handler({}, context)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error("Error in handler:", err);
      throw err;
    });

  console.log("Handler result:", result);

  await closePool();

}

// Run the examples
if (require.main === module) {
  runTest().catch(console.error);
}
