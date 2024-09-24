const express = require("express");
const { getQRCode } = require("../controllers/qrCodeController");

const router = express.Router();

router.get("/get", getQRCode);

module.exports = router;
