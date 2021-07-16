const express = require("express");
const controller = require("../controllers/guestbook-api");

const router = express.Router();

router.route("").get(controller.read); // api/guestbook?sno=10&cnt=5
router.route("/:no").delete(controller.delete);
router.route("").post(controller.create);

module.exports = router;
