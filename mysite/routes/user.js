const express = require("express");
const controller = require("../controllers/user");
const authorized = require("./authorized");

const router = express.Router();
// router.route("/join").get(controller.joinform);
router.route("/join").get(controller.join);
router.route("/join").post(controller._join);
router.route("/joinsuccess").get(controller.joinsuccess);

// router.route("/login").get(controller.loginform);
router.route("/login").get(controller.login);
router.route("/login").post(controller._login);

router.route("/logout").get(controller.logout);

router.route("/update").get(authorized, controller.update);
router.route("/update").post(authorized, controller._update);

module.exports = router;
