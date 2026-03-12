"use strict";
const http = require("http");
const url = require("url");
const binarycase = require("binary-case");
const isType = require("type-is");

function getPathWithQueryStringParams(event) {
  return url.format({
    pathname: event.path,
    query: event.queryStringParameters,
  });
}

function getRandomString() {
  return Math.random().toString(36).substring(2, 15);
}

function getEventBody(event) {
  return Buffer.from(event.body, event.isBase64Encoded ? "base64" : "utf8");
}

function getContentType(params) {
  return params.contentTypeHeader ? params.contentTypeHeader.split(";")[0] : "";
}

function isContentTypeBinaryMimeType(params) {
  return (
    params.binaryMimeTypes.length > 0 &&
    !!isType.is(params.contentType, params.binaryMimeTypes)
  );
}

function clone(json) {
  return JSON.parse(JSON.stringify(json));
}

function startServer(server) {
  return server.listen(getSocketPath(server._socketPathSuffix));
}

function mapApiGatewayEventToHttpRequest(event, context, socketPath) {
  const headers = Object.assign({}, event.headers);

  if (event.body && !headers["Content-Length"]) {
    const body = getEventBody(event);
    headers["Content-Length"] = Buffer.byteLength(body);
  }

  const clonedEventWithoutBody = clone(event);
  delete clonedEventWithoutBody.body;

  headers["x-apigateway-event"] = encodeURIComponent(
    JSON.stringify(clonedEventWithoutBody),
  );
  headers["x-apigateway-context"] = encodeURIComponent(JSON.stringify(context));
  return {
    method: event.httpMethod,
    path: getPathWithQueryStringParams(event),
    headers,
    socketPath,
  };
}

function forwardResponseToApiGateway(server, response, resolver) {
  let buf = [];

  response
    .on("data", (chunk) => {
      buf.push(chunk);
    })
    .on("end", () => {
      const bodyBuffer = Buffer.concat(buf);
      const statusCode = response.statusCode;
      const headers = response.headers;

      if (headers["transfer-encoding"] === "chunked") {
        delete headers["transfer-encoding"];
      }

      Object.keys(headers).forEach((h) => {
        if (Array.isArray(headers[h])) {
          if (h.toLowerCase() === "set-cookie") {
            headers[h].forEach((value, i) => {
              headers[binarycase(h, i + 1)] = value;
            });
            delete headers[h];
          } else {
            headers[h] = headers[h].join(",");
          }
        }
      });

      const contentType = getContentType({
        contentTypeHeader: headers["context-type"],
      });
      const isBase64Encoded = isContentTypeBinaryMimeType({
        contentType,
        binaryMimeTypes: server._binaryTypes,
      });
      const body = bodyBuffer.toString(isBase64Encoded ? "base64" : "utf8");
      const successResponse = { statusCode, body, headers, isBase64Encoded };

      resolver.succeed({ response: successResponse });
    });
}

function forwardConnectionErrorResponseToApiGateway(error, resolver) {
  console.log("ERROR: fgs-express connection error");
  console.log(error);
  const errorResponse = {
    statusCode: 502,
    body: "",
    headers: {},
  };

  resolver.succeed({ response: errorResponse });
}

function forwardLibraryErrorResponseToApiGateway(error, resolver) {
  console.log("ERROR: fgs-express error");
  console.error(error);
  const errorResponse = {
    statusCode: 500,
    body: "",
    headers: {},
  };

  resolver.succeed({ response: errorResponse });
}

function forwardRequestToNodeServer(server, event, context, resolver) {
  try {
    const requestOptions = mapApiGatewayEventToHttpRequest(
      event,
      context,
      getSocketPath(server._socketPathSuffix),
    );
    const req = http.request(requestOptions, (response) =>
      forwardResponseToApiGateway(server, response, resolver),
    );
    if (event.body) {
      const body = getEventBody(event);
      req.write(body);
    }
    req
      .on("error", (error) => {
        forwardConnectionErrorResponseToApiGateway(error, resolver);
      })
      .end();
  } catch (error) {
    forwardLibraryErrorResponseToApiGateway(error, resolver);
    return server;
  }
}

function startServer(server) {
  return server.listen(getSocketPath(server._socketPathSuffix));
}

function getSocketPath(socketPathSuffix) {
  if (/^win/.test(process.platform)) {
    const path = require("path");
    return path.join(
      "\\\\?\\pipe",
      process.cwd(),
      `server-${socketPathSuffix}`,
    );
  } else {
    return `/tmp/server-${socketPathSuffix}.sock`;
  }
}

function createServer(requestListener, serverListenCallback, binaryTypes) {
  const server = http.createServer(requestListener);

  server._socketPathSuffix = getRandomString();
  server._binaryTypes = binaryTypes ? binaryTypes.slice() : [];
  server.on("listening", () => {
    server._isListening = true;
    if (serverListenCallback) {
      serverListenCallback();
    }
  });

  server
    .on("close", () => {
      server._isListening = false;
    })
    .on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.warn(
          `WARNING: Attempting to listen on socket ${getSocketPath(server._socketPathSuffix)}, but it is already in use. This is likely as a result of a previous invocation error or timeout. Check the logs for the invocation(s) immediately prior to this for root cause, and consider increasing the timeout and/or cpu/memory allocation if this is purely as a result of a timeout. aws-serverless-express will restart the Node.js server listening on a new port and continue with this request.`,
        );
        server._socketPathSuffix = getRandomString();
        return server.close(() => startServer(server));
      } else {
        console.log("ERROR: server error");
        console.error(error);
      }
    });

  return server;
}

function proxy(server, event, context, callback) {
  return {
    promise: new Promise((resolve, reject) => {
      const promise = {
        resolve,
        reject,
      };
      const resolver = makeResolver({
        callback,
        promise,
      });

      if (server._isListening) {
        forwardRequestToNodeServer(server, event, context, resolver);
      } else {
        startServer(server).on("listening", () =>
          forwardRequestToNodeServer(server, event, context, resolver),
        );
      }
    }),
  };
}

function makeResolver(options) {
  return {
    succeed: (params2) => {
      if (options.callback) {
        return options.callback(null, params2.response);
      } else {
        return options.promise.resolve(params2.response);
      }
    },
  };
}

exports.createServer = createServer;
exports.proxy = proxy;
