const express = require("express");

const helloRouter = express.Router();
helloRouter.route("/01").get(function (req, res) {
  res.render("hello/01");
});
helloRouter.route("/02").get(function (req, res) {
  // hello/02?no=10&email=sewon@email.com
  res.render("hello/02", {
    //req.query로 넘겨도 되지 않을까? 없을 때 error가 생김..
    no: req.query.no || "", // default // 10
    email: req.query.email || "", // sewon@email.com
  });
});

module.exports = helloRouter;
