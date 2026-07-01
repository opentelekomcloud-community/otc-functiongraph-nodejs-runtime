'use strict'

const Koa = require("koa");

const KoaRouter = require("@koa/router");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new KoaRouter();

// Logger middleware - captures X-Cff-Request-Id and adds it to all logs
app.use(async (ctx, next) => {
  const requestId = ctx.get("X-Cff-Request-Id") || "no-request-id";

  // Function to format timestamp as yyyy-mm-ddThh:mm:ss.SSSZ
  const getTimestamp = () => {    
    return new Date().toISOString();
  };
  const logLevel = (process.env.RUNTIME_LOG_LEVEL || "DEBUG").toUpperCase(); // Default to debug if not set

  // Create a contextual logger that includes timestamp and request ID
  ctx.logger = {
    log: (...args) => console.log(`${getTimestamp()} [LOG] [${requestId}]`, ...args),
    debug: (...args) => {
      if (["DEBUG"].includes(logLevel)) {
        console.debug(`${getTimestamp()} [DEBUG] [${requestId}]`, ...args);
      }
    },
    info: (...args) => {
      if (["DEBUG", "INFO"].includes(logLevel)) {
        console.info(`${getTimestamp()} [INFO] [${requestId}]`, ...args);
      }
    },
    warn: (...args) => {
      if (["DEBUG", "INFO", "WARN"].includes(logLevel)) {
        console.warn(`${getTimestamp()} [WARN] [${requestId}]`, ...args);
      }
    },
    error: (...args) => {
      if (["DEBUG", "INFO", "WARN", "ERROR"].includes(logLevel)) {
        console.error(`${getTimestamp()} [ERROR] [${requestId}]`, ...args);
      }
    },
  };

  ctx.logger.info(`${ctx.method} ${ctx.url} - Request received`);

  await next();

  ctx.logger.info(`${ctx.method} ${ctx.url} - Response: ${ctx.status}`);
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

router.post("/init", async (ctx) => {
  ctx.logger.debug("init called with body:", ctx.request.body);
  ctx.response.type = "application/json";
  ctx.response.body = "POST Init called !";
  ctx.response.status = 200;
});

router.get("/index", async (ctx) => {
  ctx.logger.debug("Received GET request with query:", ctx.request.query);

  const name = ctx.request.query.name || "unknown user";

  ctx.response.type = "application/json";
  ctx.response.body = `Hello world, ${name}!`;
  ctx.response.status = 200;
});

router.post("/index", async (ctx) => {
  const body = ctx.request.body;

  ctx.logger.debug("Received body:", body);
  ctx.logger.debug("Name is: ", body.name);

  // Log all headers
  const headers = ctx.request.headers;
  ctx.logger.debug("All request headers:");
  for (const [key, value] of Object.entries(headers)) {
    ctx.logger.debug(`  ${key}: ${value}`);
  }

  ctx.response.type = "application/json";
  ctx.response.body = `Hello World, ${body.name || "unknown user"}!`;
  ctx.response.status = 200;
});

app.listen(8000);
