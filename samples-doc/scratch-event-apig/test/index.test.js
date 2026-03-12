"use strict";

const { APIGResponse } = require("apig-event");

const { randomUUID } = require("crypto");

const { Context } = require("fg-runtime");
const { handler } = require("../src/index");
const { assert } = require("console");
const { hasUncaughtExceptionCaptureCallback } = require("process");

function getContext() {
  const context = new Context({
    requestID: randomUUID(),
    funcEnv: {
      RUNTIME_FUNC_NAME: "apig-test",
      RUNTIME_PACKAGE: "default",
      RUNTIME_PROJECT_ID: process.env.OTC_SDK_PROJECTID,
      RUNTIME_FUNC_VERSION: "latest",
      RUNTIME_MEMORY: "128",
      RUNTIME_CPU: "1",
      RUNTIME_TIMEOUT: "5",
    },
  });
  return context;
}

test("Test APIG event handler: apig_event_html.json", async () => {
  const event = require("../resources/apig_event_html.json");
  const context = getContext();

  const result = await handler(event, context);

  const r = APIGResponse.fromJSON(result);
  const body = r.getBody();

  assert(
    body === "<html><h1>Welcome to use FunctionGraph</h1></html>`",
    "Expected body to be '<html><h1>Welcome to use FunctionGraph</h1></html>'",
  );
});

test("Test APIG event handler: apig_event_json.json", async () => {
  const event = require("../resources/apig_event_json.json");
  const context = getContext();

  const result = await handler(event, context);

  const r = APIGResponse.fromJSON(result);
  const body = r.getBody();
  assert(
    body === '{"name":"T Cloud Public"}',
    'Expected body.key to be \'{"name":"T Cloud Public"}\'',
  );
});

test("Test APIG event handler: apig_event_json_b64.json", async () => {
  const event = require("../resources/apig_event_json_b64.json");
  const context = getContext();

  const result = await handler(event, context);

  const r = APIGResponse.fromJSON(result);
  const body = r.getBody();

  assert(
    body === '{"name":"T Cloud Public"}',
    'Expected body.key to be \'{"name":"T Cloud Public"}\'',
  );
});
