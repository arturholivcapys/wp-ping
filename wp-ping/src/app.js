const { app, PORT } = require("./config");
const messageRoutes = require("./routes/messageRoutes");
const qrcodeRoutes = require("./routes/qrCodeRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use("/api/messages", messageRoutes);
app.use("/api/qrcode", qrcodeRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
