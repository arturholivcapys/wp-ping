const { Client } = require("whatsapp-web.js");

let qrCodeData = null;

const client = new Client();

client.on("ready", () => {
    console.log("Cliente está pronto!");
});

// Evento disparado quando o QR code é gerado
client.on("qr", (qr) => {
    console.log("QR Code gerado.");
    qrCodeData = qr;
});

client.initialize();

module.exports = { client, qrCodeData };
