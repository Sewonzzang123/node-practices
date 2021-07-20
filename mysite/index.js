(function () {
  // require 은 동기 : 초기화작업을 맨 앞에
  const express = require("express");
  const session = require("express-session");
  const http = require("http");
  const path = require("path");
  const dotenv = require("dotenv");
  const multer = require("multer");

  //environment variables(환경변수)
  dotenv.config({ path: path.join(__dirname, "config/app.env") });
  dotenv.config({ path: path.join(__dirname, "config/db.env") });

  //Application Routers
  const { applicationRouter } = require("./routes");

  // Logging
  const logger = require("./logging");

  // application setup 작업
  const application = express()
    // 1. session environment
    .use(
      session({
        secret: "mysite-session", //쿠키 변조를 방지하기 위한 값
        resave: false, // 요청 처리에서 세션의 변동사항이 있어도 항상 저장
        // 새로 세션을 생성할 때 "uninitialized" 상태로 둔다. 따라서 로그인 세션에서는 false 하는 것이 좋다.
        saveUninitialized: false,
      })
    )
    // 2. request body-parser
    .use(express.urlencoded({ extended: true })) //application/x-www-form-urlencoded
    .use(express.json()) // application/json
    // multipart
    .use(
      multer({
        dest: path.join(__dirname, process.env.MULTER_TEMPORARY_STORE),
      }).single("file" /** form input type = file */)
    )
    // 3. static serve
    .use(
      express.static(
        path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY)
      )
    )
    // Favicon
    // .use(favicon(path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY, 'assets', 'images', 'favicon.ico')))

    // 4. view engine setup
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs");

  // Application Router Setup
  applicationRouter.setup(application);

  // server setup
  http
    .createServer(application)
    .on("listening", function () {
      logger.info(`Http Server running on port ${process.env.PORT}`);
    })
    .on("error", function (error) {
      switch (error.code) {
        case "EACCESS":
          logger.error(`Port:${process.env.PORT} requires privileges`);
          process.exit(1);
          break;
        case "EADDRINUSE":
          logger.error(`Port:${process.env.PORT} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    })
    .listen(process.env.PORT);
})();
