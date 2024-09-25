const { client } = require("../config");
const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');
const mime = require('mime-types');

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

const sendMessage = async (req, res) => {
    console.log("Requisição recebida:", JSON.stringify(req.body, null, 2));

    const { number, message, fileUrl, fileName, contentType, options } = req.body;

    if (!number || (!message && !fileUrl)) {
        return res.status(400).send({
            success: false,
            error: "Número e mensagem ou URL do arquivo são obrigatórios.",
        });
    }

    const chatId = `${number}@c.us`;

    try {
        console.log("Preparando para enviar mensagem para:", chatId);
        let content;
        let sendOptions = options || {};

        if (fileUrl) {
            console.log("Tentando baixar mídia da URL:", fileUrl);
            try {
                // Tenta determinar o tipo MIME a partir da extensão do arquivo
                const detectedMimeType = mime.lookup(fileName) || contentType || 'application/octet-stream';
                
                // Baixa o conteúdo do arquivo
                const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
                const buffer = Buffer.from(response.data, 'binary');
                
                // Cria o objeto MessageMedia
                const media = new MessageMedia(detectedMimeType, buffer.toString('base64'), fileName);
                console.log("Mídia baixada com sucesso");
                content = media;
                sendOptions.caption = message; // Usa a mensagem como legenda para a mídia
            } catch (mediaError) {
                console.error("Erro ao baixar mídia:", mediaError);
                return res.status(400).send({
                    success: false,
                    error: `Erro ao baixar mídia: ${mediaError.message}`,
                });
            }
        } else {
            content = message;
        }

        console.log("Enviando mensagem");
        const response = await client.sendMessage(chatId, content, sendOptions);
        console.log("Mensagem enviada com sucesso");

        res.status(200).send({
            success: true,
            message: "Mensagem enviada com sucesso.",
            response: {
                id: response.id._serialized,
                timestamp: response.timestamp,
                from: response.from,
                to: response.to,
                hasMedia: response.hasMedia,
                type: response.type
            }
        });
    } catch (err) {
        console.error("Erro ao enviar mensagem:", err);
        res.status(500).send({
            success: false,
            error: `Erro ao enviar a mensagem: ${err.message}`,
            stack: err.stack
        });
    }
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
