const express = require("express");
const {
    sendMessage,
    getMessages,
    getTeste,
    deleteMessage,
    editMessage,
    replyToMessage,
    getChat,
    getMessageId,
    getChatIdByPhoneNumber,
    getMessagesByChatId,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/send", sendMessage);
router.get("/message", getMessages);
router.get("/teste", getTeste);
router.delete("/delete", deleteMessage);
router.put("/edit", editMessage);
router.post("/reply", replyToMessage);
router.get("/chat/:messageId", getChat);
router.get("/id/:from/:body", getMessageId);
router.get("/chat-id/:number", getChatIdByPhoneNumber);
router.get("/chat-id/:chatId", getMessagesByChatId);
module.exports = router;
