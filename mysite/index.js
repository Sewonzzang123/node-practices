// require 은 동기 : 초기화작업을 맨 앞에
const express = require("express");
const http = require("http");
const path = require("path");
const dotenv = require("dotenv");

//Routers
const mainRouter = require("./routes/main");
const userRouter = require("./routes/user");

//environment variables(환경변수)
dotenv.config({ path: path.join(__dirname, "config/app.env") });

// application setup 작업
const application = express()
  // 1. static serve
  .use(
    express.static(path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY))
  )
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
  .use("/", mainRouter)
  .use("/user", userRouter)
  .use((req, res) => {
    //없는 것들에 대한 처리
    res.render("error/404");
  });

// server setup
http
  .createServer(application)
  .on("listening", function () {
    console.info(`Http Server running on port ${process.env.PORT}`);
  })
  .on("error", function (error) {
    switch (error.code) {
      case "EACCESS":
        console.error(`Port:${process.env.PORT} requires privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(`Port:${process.env.PORT} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  })
  .listen(process.env.PORT);
