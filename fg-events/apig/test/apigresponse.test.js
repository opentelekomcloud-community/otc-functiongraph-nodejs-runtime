const assert = require("assert");
const { APIGResponse } = require("fg-apig-event");

test("APIGResponse should keep constructor values", () => {
  const response = new APIGResponse(200, "ok", { "content-type": "text/plain" }, false);

  assert.strictEqual(response.statusCode, 200);
  assert.strictEqual(response.getRawBody(), "ok");
  assert.strictEqual(response.getBody(), "ok");
  assert.deepStrictEqual(response.headers, { "content-type": "text/plain" });
  assert.strictEqual(response.isBase64Encoded, false);
});

test("APIGResponse should set and return plain string body", () => {
  const response = new APIGResponse(200, "");

  response.setBody("hello");

  assert.strictEqual(response.getRawBody(), "hello");
  assert.strictEqual(response.getBody(), "hello");
});

test("APIGResponse should stringify plain object body", () => {
  const response = new APIGResponse(200, "");

  response.setBody({ name: "OpenTelekomCloud" });

  assert.strictEqual(response.getBody(), '{"name":"OpenTelekomCloud"}');
  assert.deepStrictEqual(response.getBodyParsed(), { name: "OpenTelekomCloud" });
});

test("APIGResponse should encode and decode base64 string body", () => {
  const response = new APIGResponse(200, "");

  response.setBody("hello", true);

  assert.strictEqual(response.getRawBody(), Buffer.from("hello", "utf-8").toString("base64"));
  assert.strictEqual(response.getBody(), "hello");
  assert.strictEqual(response.isBase64Encoded, true);
});

test("APIGResponse should encode and decode base64 object body", () => {
  const response = new APIGResponse(200, "");

  response.setBody({ name: "OpenTelekomCloud" }, true);

  assert.strictEqual(response.getBody(), '{"name":"OpenTelekomCloud"}');
  assert.deepStrictEqual(response.getBodyParsed(), { name: "OpenTelekomCloud" });
});

test("APIGResponse toJSON should return a serializable payload", () => {
  const response = new APIGResponse(200, "Hello World", { "Content-Type": "application/json"  }, false);

  assert.deepStrictEqual(response.toJSON(), {
    statusCode: 200,
    body: "Hello World",
    headers: { "Content-Type": "application/json"  },
    isBase64Encoded: false,
  });
});
