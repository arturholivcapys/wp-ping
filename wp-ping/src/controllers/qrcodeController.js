const { client } = require("../config");
const qrcode = require("qrcode");

let currentQRCode = null;

client.on("qr", async (qr) => {
    try {
        const qrBase64 = await qrcode.toDataURL(qr);
        currentQRCode = qrBase64;
    } catch (err) {
        console.error("Erro ao gerar QR code:", err);
    }
});

const getQRCode = (req, res) => {
    if (currentQRCode) {
        res.status(200).send({
            success: true,
            qrCode: currentQRCode,
        });
    } else {
        res.status(404).send({
            success: false,
            error: "QR Code não disponível no momento.",
        });
    }
};

module.exports = {
    getQRCode,
};
