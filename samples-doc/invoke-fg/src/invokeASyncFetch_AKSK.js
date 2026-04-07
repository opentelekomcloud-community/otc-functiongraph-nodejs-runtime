const { Signer, HttpRequest } = require("otc-api-sign-sdk-nodejs");

const region = process.env.OTC_SDK_REGION || "eu-de";

const fgEndpoint = `https://functiongraph.${region}.otc.t-systems.com`;
const projectId = process.env.OTC_SDK_PROJECT_ID;
const ak = process.env.OTC_SDK_AK;
const sk = process.env.OTC_SDK_SK;

const functionName = "nodejs-sample-invoke-function";
const functionVersion = "latest";
const functionApp = "default";

async function main() {
  const functionURN = `urn:fss:${region}:${projectId}:function:${functionApp}:${functionName}:${functionVersion}`;

  // Endpoint for asynchronous invocation
  const invokeURI = `${fgEndpoint}/v2/${projectId}/fgs/functions/${functionURN}/invocations-async`;

  console.log("Invoke URI: ", invokeURI);

  // set body according to your function input
  const body = {
    key: "Hello T-Cloud Public World - ASYNC ",
  };

  const bodyText = JSON.stringify(body);

  // set request method
  const method = "POST";

  // set headers
  const headers = {
    "Content-Type": "application/json;charset=utf8",
    Host: new URL(fgEndpoint).host,
    "X-Project-Id": projectId,
  };

  // create HttpRequest instance
  const request = new HttpRequest(method, invokeURI, headers, bodyText);

  // create Signer instance and set AK/SK
  const signer = new Signer();
  signer.Key = ak;
  signer.Secret = sk;

  // sign the request
  const signedRequest = signer.Sign(request);

  // send signed request with Node.js fetch
  try {
    const response = await fetch(invokeURI, {
      method: signedRequest.method,
      headers: signedRequest.headers,
      body: bodyText,
    });

    const data = await response.text();

    if (!response.ok) {
      console.error("Error: ", data);
      return;
    }

    // output response
    console.log("Response: ", data);
  } catch (error) {
    console.error("Error: ", error);
  }
}

main();
