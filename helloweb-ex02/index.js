// require 은 동기 : 초기화작업을 맨 앞에
const express = require("express");

const http = require("http");
const path = require("path");

//Routers
const mainRouter = require("./routes/main");
const helloRouter = require("./routes/hello");
const port = 8080;

// application setup 작업
const application = express()
  // 1. static serve
  .use(express.static(path.join(__dirname, "public")))
  // 2. view engine setup
  // 3. request router
  .all("*", function (req, res, next) {
    res.locals.req = req;
    res.locals.res = res;
    next();
  })
  .use("/", mainRouter)
  .use("/hello", helloRouter);

// server setup
http
  .createServer(application)
  .on("listening", function () {
    console.info("Http Server running on port " + port);
  })
  .on("error", function (error) {
    switch (error.code) {
      case "EACCESS":
        console.error(`Port:${port} requires privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(`Port:${port} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  })
  .listen(port);
