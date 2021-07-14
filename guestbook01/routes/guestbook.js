const express = require("express");
const controller = require("../controllers/guestbook");

const router = express.Router();

router.route("").get(controller.index);
router.route("/delete").get(controller.deleteform);
router.route("/delete").post(controller.delete);
router.route("/add").post(controller.add);

module.exports = router;
