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

client.on("ready", () => {
    console.log("Cliente está pronto!");
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    console.log("QR Code gerado.");
});

client.initialize();

module.exports = { app, PORT, client };
