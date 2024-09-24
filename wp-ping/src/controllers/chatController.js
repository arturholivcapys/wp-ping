const { client } = require("../config");

const getContact = async (req, res) => {
    const { chatId } = req.params;
    try {
        const chat = await client.getChatById(chatId);
        const contact = await chat.getContact();
        res.status(200).send({
            success: true,
            contact,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message,
        });
    }
};

const fetchMessages = async (req, res) => {
    const { chatId } = req.params;
    const { limit } = req.query;
    try {
        const chat = await client.getChatById(chatId);
        const messages = await chat.fetchMessages({
            limit: parseInt(limit) || 50,
        });
        res.status(200).send({
            success: true,
            messages,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message,
        });
    }
};

const sendMessage = async (req, res) => {
    const { chatId } = req.params;
    const { content } = req.body;
    try {
        const chat = await client.getChatById(chatId);
        const message = await chat.sendMessage(content);
        res.status(200).send({
            success: true,
            message,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message,
        });
    }
};

// Função de teste
const getTeste = (req, res) => {
    res.status(200).send({
        success: true,
        galo: "13",
    });
};

module.exports = {
    getContact,
    fetchMessages,
    sendMessage,
    getTeste,
};
