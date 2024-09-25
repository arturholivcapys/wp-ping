const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

const client = new Client();

let isReady = false;

client.on("ready", () => {
    console.log("Cliente está pronto!");
    isReady = true;
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    console.log("QR Code gerado.");
});

client.initialize();

const ensureClientReady = (req, res, next) => {
    if (!isReady) {
        return res.status(503).send({
            success: false,
            error: "O cliente WhatsApp ainda não está pronto. Tente novamente em alguns instantes."
        });
    }
    next();
};

module.exports = { app, PORT, client, ensureClientReady };
