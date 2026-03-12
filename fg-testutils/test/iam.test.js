const { getTempAKSK, getTokenUsernamePassword } = require("../src/iam");


async function runTest() {
  const creds = await getTempAKSK();
  console.log(`ak:`, creds.ak)
  console.log(`sk:`, creds.sk)
  console.log(`token:`, creds.token);
}

async function runTest2() {
  const token = await getTokenUsernamePassword();
  console.log("x-subject-token:", token);
  
}

// Run the examples
if (require.main === module) {
  runTest().catch(console.error);
  runTest2().catch(console.error);
}
