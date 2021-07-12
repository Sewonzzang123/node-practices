const express = require("express");

const mainRouter = express.Router();
mainRouter.route("").get(function (req, res) {
  res.render("main/index");
});

module.exports = mainRouter;
