"use strict";
const https = require("https");

const { TimerEvent } = require("@opentelekomcloud-community/fg-timer-event");

const {
  Signer,
  HttpRequest,
} = require("@opentelekomcloud-community/otc-api-sign-sdk-nodejs");

/**
 *
 * @param {TimerEvent} event
 * @param {*} context
 * @returns
 */
exports.handler = async function (event, context) {
  // get logger from context
  const log = context.getLogger();

  const timerEvent = new TimerEvent(event);
  const timerName = timerEvent.getTriggerName();
  const userEvent = timerEvent.getUserEvent();

  log.info(
    `Timer ${timerName} received with user event: ${userEvent} for ECS instance: ${instance_id}`,
  );

  // get temporary ak/sk/token from context
  // to use, an agency with permission to invoke FunctionGraph is needed:
  const ak = context.getSecurityAccessKey();
  const sk = context.getSecuritySecretKey();
  const token = context.getSecurityToken();

  // get projectId from Runtime environment variable (set in FG backend)
  const projectId = process.env.RUNTIME_PROJECT_ID || "";

  const region = context.getUserData("REGION") || "eu-de";

  const ecsEndpoint =
    context.getUserData("ECS_ENDPOINT") ||
    "https://ecs.eu-de.otc.t-systems.com";

  const instance_id = context.getUserData("INSTANCE_ID");

  const invokeURI = `${ecsEndpoint}/v1/${projectId}/cloudservers/action`;

  let body = {};

  if (userEvent === "start") {
    body = {
      "os-start": {
        servers: [{ id: instance_id }],
      },
    };
  } else if (userEvent === "stop") {
    body = {
      "os-stop": {
        type: "SOFT",
        servers: [{ id: instance_id }],
      },
    };
  } else {
    log.error("Unknown user event: ", userEvent);
    return "unknown event";
  }

  const payload = JSON.stringify(body);

  // set headers
  const headers = {
    "Content-Type": "application/json;charset=utf8",
    Host: new URL(ecsEndpoint).host,
    "X-Project-Id": projectId,
  };

  // create HttpRequest instance
  const request = new HttpRequest("POST", invokeURI, headers, payload);

  // create Signer instance and use temporary ak/sk/token to sign the request
  const signer = new Signer();
  signer.Key = ak;
  signer.Secret = sk;
  signer.SecurityToken = token;

  // sign the request
  const signedRequest = signer.Sign(request);

  // send the signed request
  return new Promise((resolve, reject) => {
    const req = https.request(signedRequest, (res) => {
      res.setEncoding("utf8");

      let responseBody = "";
      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        console.log("Response: ", responseBody);
        if (res.statusCode && res.statusCode >= 400) {
          reject(
            new Error(
              `Backend request failed with status ${res.statusCode}: ${responseBody}`,
            ),
          );
          return;
        }

        resolve(responseBody);
      });
    });

    req.on("error", reject);
    req.write(payload);
    req.end();
  });
};
