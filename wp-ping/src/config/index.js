const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const qrRoutes = require("../routes/qrCodeRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", qrRoutes);

module.exports = { app, PORT };
