const express = require("express");
const controller = require("../controllers/user-api");
const authorized = require("./authorized");

const router = express.Router();
router.route("/checkemail").get(controller.checkemail);
router.route("/needauth").get(authorized(), function (req, res) {
  res.send({
    result: "success",
  });
});
router.route("/error").get(function (req, res, next) {
  try {
    throw new Error("Broken");
  } catch (err) {
    next(err);
  }
});
module.exports = router;
