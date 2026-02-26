const Koa = require("koa");

const KoaRouter = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const moment = require("moment");

const app = new Koa();
const router = new KoaRouter();

// Logger middleware - captures X-Cff-Request-Id and adds it to all logs
app.use(async (ctx, next) => {
  const requestId = ctx.get("X-Cff-Request-Id") || "no-request-id";

  // Function to format timestamp as yyyymmddThh:mm:ss.SSSZ
  const getTimestamp = () => {
    return moment().utc().format("YYYYMMDDTHH:mm:ss.SSS[Z]");
  };

  // Create a contextual logger that includes timestamp and request ID
  ctx.logger = {
    log: (...args) => console.log(`${getTimestamp()} [${requestId}]`, ...args),
    info: (...args) =>
      console.info(`${getTimestamp()} [${requestId}]`, ...args),
    warn: (...args) =>
      console.warn(`${getTimestamp()} [${requestId}]`, ...args),
    error: (...args) =>
      console.error(`${getTimestamp()} [${requestId}]`, ...args),
  };

  ctx.logger.info(`${ctx.method} ${ctx.url} - Request received`);

  await next();

  ctx.logger.info(`${ctx.method} ${ctx.url} - Response: ${ctx.status}`);
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

router.post("/init", async (ctx) => {
  ctx.logger.log("init called with body:", ctx.request.body);
  ctx.response.type = "application/json";
  ctx.response.body = "POST Init called !";
  ctx.response.status = 200;
});

router.post("/invoke", async (ctx) => {
  const body = ctx.request.body;

  ctx.logger.log("Received body:", body);
  ctx.logger.log("Key is: ", body.key);

  // Log all headers
  const headers = ctx.request.headers;
  ctx.logger.log("All request headers:");
  for (const [key, value] of Object.entries(headers)) {
    ctx.logger.log(`  ${key}: ${value}`);
  }

  ctx.response.type = "application/json";
  ctx.response.body = "Hello World, user!";
  ctx.response.status = 200;
});

app.listen(8000);
