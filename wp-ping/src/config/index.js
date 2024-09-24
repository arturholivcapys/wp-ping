const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const WebSocket = require("ws");

const app = express();
const PORT = process.env.PORT || 8080;
const WS_PORT = process.env.WS_PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

const client = new Client();

// Inicializa o servidor WebSocket
const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
    console.log("Cliente conectado");

    ws.on("close", () => {
        console.log("Cliente desconectado");
    });
});

// Evento que indica que o cliente está pronto
client.on("ready", () => {
    console.log("Cliente está pronto!");
});

// Evento que gera o QR code
client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });

    // Converte o QR code para Base64
    const qrBase64 = Buffer.from(qr).toString("base64");

    // Envia o QR code para todos os clientes conectados via WebSocket
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ qrCode: qrBase64 }));
        }
    });
});

// Inicializa o cliente do WhatsApp
client.initialize();

// Configuração do servidor HTTP e WebSocket
const server = app.listen(WS_PORT, () => {
    console.log(`Servidor rodando na porta ${WS_PORT}`);
});

// Lida com as atualizações do servidor WebSocket
server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
    });
});

module.exports = { app, PORT, client };
