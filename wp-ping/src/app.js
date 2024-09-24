const { app, PORT } = require("./config");
const messageRoutes = require("./routes/messageRoutes");
const qrcodeRoutes = require("./routes/qrCodeRoutes");

app.use("/api", messageRoutes);
app.use("/api", qrcodeRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
