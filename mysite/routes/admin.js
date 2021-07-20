const express = require("express");
const controller = require("../controllers/admin");
const authorized = require("./authorized");

const router = express.Router();

router.route("").get(/**authorized("ADMIN"),*/ controller.index);
router.route("/update").post(/**authorized("ADMIN"),*/ controller.update);
module.exports = router;
