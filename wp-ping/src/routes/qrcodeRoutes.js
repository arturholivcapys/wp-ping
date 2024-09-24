const express = require("express");
const { getQRCode } = require("../controllers/qrCodeController");

const router = express.Router();

router.get("/get-qr-code", getQRCode);

module.exports = router;
