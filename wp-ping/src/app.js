const { app, PORT } = require("./config");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
