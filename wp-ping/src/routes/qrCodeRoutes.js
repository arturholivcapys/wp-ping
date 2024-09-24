const express = require("express");
const { getQRCode } = require("../controllers/qrCodeController");

const router = express.Router();

router.get("/qrCode", getQRCode);

module.exports = router;
