const fs = require("fs");
const Busboy = require("busboy");
const tempy = require("tempy");
const config = require("../config");

function processFile(req, res, ffmpeg, logger) {
  let bytes = 0;
  let fileName = "";
  const hitLimit = false;
  const savedFile = tempy.file();
  const busboy = new Busboy({
    headers: req.headers,
    limits: {
      files: 1,
      fileSize: config.fileSizeLimit,
    },
  });
  busboy.on("filesLimit", function () {
    logger.error({
      type: "filesLimit",
      message: "Upload file size limit hit",
    });
  });

  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    file.on("limit", function (file) {
      hitLimit = true;
      const error = { file: filename, error: "exceeds max size limit" };
      logger.error({ error });
      res.writeHead(500, { Connection: "close" });
      res.end(err);
    });
    const log = {
      file: filename,
      encoding: encoding,
      mimetype: mimetype,
    };

    logger.info(log);
    file.on("data", function (data) {
      bytes += data.length;
    });
    file.on("end", function (data) {
      log.bytes = bytes;
      logger.info(log);
    });

    fileName = filename;
    logger.info({
      action: "Uploading",
      name: fileName,
    });
    const written = file.pipe(fs.createWriteStream(savedFile));

    if (written) {
      logger.info({
        action: "saved",
        path: savedFile,
      });
    }
  });
  busboy.on("finish", function () {
    if (hitLimit) {
      fs.unlinkSync(savedFile);
      return;
    }
    logger.info({
      action: "upload complete",
      name: fileName,
    });
    const outputFile = savedFile + "." + ffmpeg.extension;
    logger.info({
      action: "begin conversion",
      from: savedFile,
      to: outputFile,
    });
    ffmpeg(savedFile)
      .on("error", function (err) {
        const log = {
          type: "ffmpeg",
          message: err,
        };
        logger.error(log);
        fs.unlinkSync(savedFile);
        res.writeHead(500, { Connection: "close" });
        res.end(log);
      })
      .on("end", function () {
        fs.unlinkSync(savedFile);
        logger.info({
          action: "starting download to client",
          file: savedFile,
        });

        res.download(outputFile, null, function (err) {
          if (err) {
            logger.error({
              type: "download",
              message: err,
            });
          }
          logger.info({
            action: "deleting",
            file: outputFile,
          });
          if (fs.unlinkSync(outputFile)) {
            logger.info({
              action: "deleted",
              file: outputFile,
            });
          }
        });
      })
      .save(outputFile);
  });
  return req.pipe(busboy);
}

module.exports = processFile;
