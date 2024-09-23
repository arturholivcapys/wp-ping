const { client } = require("../config");

let messages = [];

client.on("message_create", (message) => {
    console.log("Número:", message.from);
    console.log("Mensagem:", message.body);
    messages.push(message);
    if (message.body === "!ping") {
        client.sendMessage(message.from, "pong");
    }
});

const sendMessage = (req, res) => {
    const { number, message } = req.body;
    client
        .sendMessage(number + "@c.us", message)
        .then((response) => res.status(200).send({ success: true, response }))
        .catch((err) =>
            res.status(500).send({ success: false, error: err.message })
        );
};

const getMessages = (req, res) => {
    res.status(200).send({ success: true, messages });
};

module.exports = { sendMessage, getMessages };
