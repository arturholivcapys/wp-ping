const express = require("express");
const {
    getContact,
    fetchMessages,
    sendMessage,
    getTeste,
} = require("../controllers/chatController");

const router = express.Router();

router.get("/:chatId/contact", getContact);
router.get("/:chatId/messages", fetchMessages);
router.post("/:chatId/send", sendMessage);
router.get("/teste", getTeste);

module.exports = router;
