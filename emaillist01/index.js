// require 은 동기 : 초기화작업을 맨 앞에
const express = require("express");

const http = require("http");
const path = require("path");

//Routers
const emaillistRouter = require("./routes/emaillist");

const port = 8080;

// application setup 작업
const application = express()
  // 1. static serve
  .use(express.static(path.join(__dirname, "public")))
  // 2. request body-parser
  .use(express.urlencoded({ extended: true })) //application/x-www-form-urlencoded
  .use(express.json()) // application/json
  // 3. view engine setup
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  // 4. request router
  .all("*", function (req, res, next) {
    res.locals.req = req;
    res.locals.res = res;
    next();
  })
  .use("/", emaillistRouter);

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
