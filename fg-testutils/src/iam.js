const https = require("https");
const { Signer, HttpRequest } = require("otc-api-sign-sdk-nodejs");
const path = require("path");

// Function to get temporary AK/SK/token from IAM
async function getTempAKSK(
  ak = process.env.OTC_SDK_AK,
  sk = process.env.OTC_SDK_SK,
  iamEndpoint = process.env.OTC_IAM_ENDPOINT ||
    "https://iam.eu-de.otc.t-systems.com",
) {
  return new Promise((resolve, reject) => {
    const signer = new Signer();

    signer.Key = ak;
    signer.Secret = sk;

    iamEndpoint = new URL(iamEndpoint).origin;

    url = iamEndpoint + "/v3.0/OS-CREDENTIAL/securitytokens";

    method = "POST";

    var postData = {
      auth: {
        identity: {
          methods: ["token"],
        },
      },
    };

    headers = {
      "Content-Type": "application/json;charset=utf8",
    };

    // sign the request
    const signedRequest = signer.Sign(
      new HttpRequest(method, url, headers, JSON.stringify(postData)),
    );

    // send the signed request
    const req = https.request(signedRequest, function (res) {
      res.setEncoding("utf8");

      let data = "";
      res.on("data", function (chunk) {
        data += chunk.toString();
      });

      res.on("end", function () {
        const parsedData = JSON.parse(data);

        resolve({
          ak: parsedData.credential.access,
          sk: parsedData.credential.secret,
          token: parsedData.credential.securitytoken,
        });
      });
    });

    req.on("error", reject);

    // send the request body
    req.write(JSON.stringify(postData));
    req.end();
  });
}

async function getTokenUsernamePassword(
  userName = process.env.OTC_USER_NAME,
  userPassword = process.env.OTC_USER_PASSWORD,
  domainName = process.env.OTC_DOMAIN_NAME,
  projectID = process.env.OTC_SDK_PROJECTID,
  iamEndpoint = process.env.OTC_IAM_ENDPOINT ||
    "https://iam.eu-de.otc.t-systems.com",
) {
  return new Promise((resolve, reject) => {
    iamEndpoint = new URL(iamEndpoint).origin;

    url = iamEndpoint + "/v3/auth/tokens?nocatalog=true";

    method = "POST";

    var postData = {
      auth: {
        identity: {
          methods: ["password"],
          password: {
            user: {
              name: userName,
              password: userPassword,
              domain: { name: domainName },
            },
          },
        },
        scope: {
          project: {
            id: projectID,
            domain: { name: domainName },
          },
        },
      },
    };


    const postOptions = {
      method: "POST",
      hostname: new URL(iamEndpoint).hostname,
      path: "/v3/auth/tokens?nocatalog=true",
      headers: {
      "Content-Type": "application/json;charset=utf8",
      "Content-Length": Buffer.byteLength(JSON.stringify(postData)),
      },
    };


    // send the signed request
    const req = https.request(postOptions, function (res) {
      res.setEncoding("utf8");

      let data = "";
      res.on("data", function (chunk) {
        data += chunk.toString();
      });

      res.on("end", function () {
        const parsedData = JSON.parse(data);

        resolve({
          token: res.headers["x-subject-token"],
        });
      });
    });

    req.on("error", reject);

    // send the request body
    req.write(JSON.stringify(postData));
    req.end();
  });
}

module.exports = {
  getTempAKSK,
  getTokenUsernamePassword,
};
