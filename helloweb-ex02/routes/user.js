const express = require("express");

const userRouter = express.Router();
userRouter.route("").get(function (req, res) {
  res.render("user/info", {
    no: req.params.no || 0,
  });
});
userRouter.route("/info/:no").get(function (req, res) {
  res.render("user/info", {
    no: req.params.no || 0,
  });
});
userRouter.route("/join").get(function (req, res) {
  res.render("user/join");
});
userRouter.route("/join").post(function (req, res) {
  console.log(req.body);
  res.redirect("/");
});
userRouter.route("/api").get(function (req, res) {
  const vo = {
    no: 10,
    name: "둘리",
    email: "dooly@gmail.com",
    gender: "male",
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(vo));
});
module.exports = userRouter;
