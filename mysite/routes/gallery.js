const express = require("express");
const controller = require("../controllers/gallery");
const authorized = require("./authorized");

const router = express.Router();

router.route("").get(controller.index);
router.route("/delete/:no").get(authorized("ADMIN"), controller.delete);
router.route("/upload").post(controller.upload);

module.exports = router;
