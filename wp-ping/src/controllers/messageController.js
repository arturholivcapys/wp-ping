const { client } = require("../config");

let messages = [];

// Evento disparado quando uma nova mensagem é criada
client.on("message_create", async (message) => {
    console.log("Número:", message.from);
    console.log("Mensagem:", message.body);

    try {
        const chat = await message.getChat();

        // Criando um objeto com informações da mensagem e do chat
        const messageWithChat = {
            id: message.id._serialized,
            body: message.body,
            from: message.from,
            timestamp: message.timestamp,
            type: message.type,
            hasMedia: message.hasMedia,
            chat: {
                id: chat.id._serialized,
                name: chat.name,
                isGroup: chat.isGroup,
                timestamp: chat.timestamp,
            },
            mediaData: message.hasMedia ? await message.downloadMedia() : null,
            caption: message.caption || null,
        };

        // Adicionando a mensagem com informações do chat ao array
        messages.push(messageWithChat);

        console.log("Mensagem com chat:", messageWithChat);

        if (message.body.trim().toLowerCase() === "!ping") {
            await client.sendMessage(message.from, "pong");
        }
    } catch (error) {
        console.error("Erro ao processar mensagem:", error);
    }
});

// Função para enviar mensagem via API
const sendMessage = (req, res) => {
    console.log("Requisição recebida:", req.body);

    // Validação básica da entrada
    const { number, message } = req.body;
    if (!number || !message) {
        return res.status(400).send({
            success: false,
            error: "Número e mensagem são obrigatórios.",
        });
    }

    // Envia a mensagem para o número especificado
    const chatId = `${number}@c.us`; // Formata o número para o padrão do WhatsApp

    client
        .sendMessage(chatId, message)
        .then((response) =>
            res.status(200).send({
                success: true,
                message: "Mensagem enviada com sucesso.",
                response,
            })
        )
        .catch((err) =>
            res.status(500).send({
                success: false,
                error: `Erro ao enviar a mensagem: ${err.message}`,
            })
        );
};

// Função para obter todas as mensagens recebidas
const getMessages = (req, res) => {
    res.status(200).send({
        success: true,
        messages,
    });
};

// Função para deletar uma mensagem
const deleteMessage = async (req, res) => {
    const { messageId, everyone } = req.body;
    try {
        const message = await client.getMessageById(messageId);
        await message.delete(everyone);
        res.status(200).send({ success: true, message: "Message deleted" });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};

// Função para editar uma mensagem
const editMessage = async (req, res) => {
    const { messageId, newContent } = req.body;
    try {
        const message = await client.getMessageById(messageId);
        await message.edit(newContent);
        res.status(200).send({ success: true, message: "Message edited" });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};

// Função para responder a uma mensagem
const replyToMessage = async (req, res) => {
    const { messageId, content } = req.body;
    try {
        const message = await client.getMessageById(messageId);
        const response = await message.reply(content);
        res.status(200).send({ success: true, response });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};

// Função para obter o chat de uma mensagem
const getChat = async (req, res) => {
    const { messageId } = req.params;
    try {
        const message = await client.getMessageById(messageId);
        const chat = await message.getChat();

        const chatInfo = {
            id: chat.id._serialized,
            name: chat.name,
            isGroup: chat.isGroup,
            timestamp: chat.timestamp,
        };

        const messageInfo = {
            id: message.id._serialized,
            body: message.body,
            from: message.from,
            timestamp: message.timestamp,
            hasMedia: message.hasMedia,
            type: message.type,
            author: message.author,
            isForwarded: message.isForwarded,
            forwardingScore: message.forwardingScore,
            isStatus: message.isStatus,
            isStarred: message.isStarred,
            broadcast: message.broadcast,
            fromMe: message.fromMe,
            hasQuotedMsg: message.hasQuotedMsg,
            vCards: message.vCards,
            mentionedIds: message.mentionedIds,
            isGif: message.isGif,
            isEphemeral: message.isEphemeral,
            links: message.links,
            mediaData: message.hasMedia ? await message.downloadMedia() : null,
            caption: message.caption || null,
        };

        res.status(200).send({
            success: true,
            chat: chatInfo,
            message: messageInfo,
        });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};

// Função para obter o ID de uma mensagem
const getMessageId = (req, res) => {
    const { from, body } = req.params;

    // Encontra a mensagem no array de mensagens pelo número e/ou pelo conteúdo
    const message = messages.find(
        (msg) => msg.from === from && msg.body.includes(body)
    );

    if (message) {
        return res.status(200).send({
            success: true,
            messageId: message.id._serialized, // O ID está na propriedade _serialized
        });
    } else {
        return res.status(404).send({
            success: false,
            error: "Mensagem não encontrada.",
        });
    }
};

// Função para obter o ID do chat pelo número de telefone
const getChatIdByPhoneNumber = async (req, res) => {
    const { number } = req.params;

    try {
        const chatId = `${number}@c.us`; // Formata o número para o padrão do WhatsApp

        // Obtém o chat correspondente ao número
        const chat = await client.getChatById(chatId);

        if (chat) {
            return res.status(200).send({
                success: true,
                chatId: chat.id._serialized, // O ID do chat está na propriedade _serialized
            });
        } else {
            return res.status(404).send({
                success: false,
                error: "Chat não encontrado.",
            });
        }
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: `Erro ao obter o chat: ${err.message}`,
        });
    }
};

// Função para obter mensagens por chatId
const getMessagesByChatId = async (req, res) => {
    const { chatId } = req.params;
    const { limit } = req.query;

    try {
        const chat = await client.getChatById(chatId);
        const messages = await chat.fetchMessages({
            limit: limit ? parseInt(limit) : 50,
        });

        res.status(200).send({
            success: true,
            messages: messages.map((msg) => ({
                id: msg.id._serialized,
                body: msg.body,
                from: msg.from,
                timestamp: msg.timestamp,
                hasMedia: msg.hasMedia,
                type: msg.type,
            })),
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error: `Erro ao obter mensagens: ${error.message}`,
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
};
