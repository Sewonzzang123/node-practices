const express = require("express");
const controller = require("../controllers/board");
const authorized = require("./authorized");

const router = express.Router();

router.route("/view/:no").get(controller.view);

router.route("/write").get(authorized("USER"), controller.write);
router.route("/write").post(authorized("USER"), controller._write);

router.route("/update/:no").get(authorized("USER"), controller.update);
router.route("/update").post(authorized("USER"), controller._update);

router.route("/delete/:no").get(authorized("USER"), controller.delete);

router.route("/reply/:no").get(authorized("USER"), controller.reply);
router.route("/reply").post(authorized("USER"), controller._reply);

router.route("").get(controller.index);
router.route("/:p").get(controller.index);

module.exports = router;
