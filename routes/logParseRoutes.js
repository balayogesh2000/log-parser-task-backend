const express = require("express");
const multer = require("multer");
const router = express.Router();
const logParseController = require("../controller/logParseController");
let upload = multer({ storage: multer.memoryStorage() });
router.route("/").post(upload.single("logs"), logParseController.logParser);
module.exports = router;
