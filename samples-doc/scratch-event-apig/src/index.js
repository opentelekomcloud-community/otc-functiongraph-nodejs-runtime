// @ts-check

const { APIGEvent, APIGResponse } = require("@opentelekomcloud-community/fg-apig-event");
/** @typedef {import("@opentelekomcloud-community/fg-apig-event").APIGEventJSON} APIGEventJSON */
/** @typedef {import("@opentelekomcloud-community/fg-apig-event").APIGResponseJSON} APIGResponseJSON */

/**
 * 
 * @param {*} context 
 * @param {*} callback 
 */
exports.initializer = function (context, callback) {
  const logger = context.getLogger();
  logger.info("Function initialized");
  callback(null, "");
};

/**
 * @param {APIGEventJSON} event
 * @param {*} context
 * @returns {Promise<APIGResponseJSON>}
 */
exports.handler = async function (event, context) {
  const logger = context.getLogger();

  logger.info("Function Name:", context.getFunctionName());

  const apigEvent = new APIGEvent(event);

  const isBase64Encoded = apigEvent.isBase64Encoded() || false;

  const body = apigEvent.getBody();
  logger.info("APIG Event body:", body);

  let responseType = apigEvent.getQueryStringParameter("responseType");

  let output;

  if (responseType === "html") {
    output = new APIGResponse(
      200,
      "",
      { "Content-Type": "text/html; charset=utf-8" },
      false,
    );
    output.setBody(
      "<html><h1>Welcome to use FunctionGraph</h1></html>",
      isBase64Encoded,
    );
  } else if (responseType === "json") {
    output = new APIGResponse(
      200,
      "",
      { "Content-Type": "application/json" },
      false,
    );
    try {
      const parsedBody = JSON.parse(body.replace(/\\\"/g, '"'));
      output.setBody(parsedBody, isBase64Encoded);
    } catch (e) {
      output.setBody({ error: "Invalid JSON input" }, isBase64Encoded);
    }
  } else {
    output = new APIGResponse(
      200,
      "",
      { "Content-Type": "text/html; charset=utf-8" },
      false,
    );
    output.setBody(
      "<html>Please construct the url with query parameters responseType=html, responseType=json</html>",
      isBase64Encoded,
    );
  }

  logger.info("returning:", output);

  return output;
};
