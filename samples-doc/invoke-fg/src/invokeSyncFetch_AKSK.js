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

  // Endpoint for synchronous invocation
  const invokeURI = `${fgEndpoint}/v2/${projectId}/fgs/functions/${functionURN}/invocations`;

  console.log("Invoke URI: ", invokeURI);

  // X-Cff-Log-Type:
  // "tail": 4KB logs will be returned
  // "": no logs will be returned
  const xCffLogType = "tail";

  // X-CFF-Request-Version:
  // "v0" response body in text format
  // "v1" response body in json format
  const xCffRequestVersion = "v1";

  // set body according to your function input
  const body = {
    key: "Hello T-Cloud Public World - SYNC",
  };

  const bodyText = JSON.stringify(body);

  // set request method
  const method = "POST";

  // set headers
  const headers = {
    "Content-Type": "application/json;charset=utf8",
    "Host": new URL(fgEndpoint).host,
    "X-Cff-Log-Type": xCffLogType,
    "X-CFF-Request-Version": xCffRequestVersion,
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

    const data = await response.json();

    if (!response.ok) {
      console.error("Error: ", data);
      return;
    }

    // output result
    console.log("Result: ", data.result);

    // output logs
    console.log("Log: ", data.log);
  } catch (error) {
    console.error("Error: ", error);
  }
}

main();
