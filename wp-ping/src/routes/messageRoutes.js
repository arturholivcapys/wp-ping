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
} = require("../controllers/messageController");

const router = express.Router();

router.post("/send-message", sendMessage);

router.get("/get-messages", getMessages);

router.get("/get-teste", getTeste);

router.delete("/delete-message", deleteMessage);

router.put("/edit-message", editMessage);

router.post("/reply-message", replyToMessage);

router.get("/get-chat/:messageId", getChat);

router.get("/get-message-id/:from/:body", getMessageId);

router.get("/get-chat-id/:number", getChatIdByPhoneNumber);

module.exports = router;
