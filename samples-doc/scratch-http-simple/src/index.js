"use strict";
const Koa = require("koa");
const app = new Koa();

app.use(async (ctx) => {
  if (ctx.request.path == "/koa") {
    ctx.response.type = "application/json";
    ctx.response.body = "Hello World, user!";
    ctx.response.status = 200;
  } else {
    ctx.response.type = "application/json";
    ctx.response.body = "Hello World!";
    ctx.response.status = 200;
  }
});

app.listen(8000);
console.log("Node.js web server at port 8000 is running.");
