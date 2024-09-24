const qrcode = require("qrcode");
const qrcodeTerminal = require("qrcode-terminal");
const { qrCodeData } = require("../config/client");

const getQRCode = (req, res) => {
    if (qrCodeData) {
        qrcode.toDataURL(qrCodeData, (err, url) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: "Erro ao gerar o QR code.",
                    error: err.message,
                });
            }
            qrcodeTerminal.generate(qrCodeData, { small: true });
            res.status(200).send({
                success: true,
                qrCode: url, // Retorna o QR code como URL base64
            });
        });
    } else {
        res.status(404).send({
            success: false,
            message:
                "QR Code não disponível ainda. Tente novamente mais tarde.",
        });
    }
};

module.exports = { getQRCode };
