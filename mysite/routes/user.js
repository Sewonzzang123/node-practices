const express = require("express");
const controller = require("../controllers/user");

const router = express.Router();
router.route("/join").get(controller.joinform);
router.route("/join").post(controller.join);
router.route("/joinsuccess").get(controller.joinsuccess);
module.exports = router;
