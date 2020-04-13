const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");
const config = require("./config.js");
const bodyParser = require("body-parser");
const ffmpeg = require("./lib/ffmpeg");
const processFile = require("./lib/processFile");

const winston = require("winston");
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

app.use(cors());
app.use(compression());
app.use(bodyParser());

app.get("/", (req, res) => {
  res.json({ status: "ok", version: config.version });
});

app.post("/convert/mp3", (req, res) => {
  cmd = ffmpeg.convertToMp3();
  processFile(req, res, cmd, logger);
});

const server = app.listen(config.port, function () {
  logger.info(`Running at http://localhost:${config.port}`);
});

server.on("connection", function (socket) {
  socket.setTimeout(config.timeout);
  socket.server.timeout = config.timeout;
  server.keepAliveTimeout = config.timeout;
});

app.use(function (req, res, next) {
  res.status(404).send(JSON.stringify({ error: "route not available" }) + "\n");
});
