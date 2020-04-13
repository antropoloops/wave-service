const ffmpeg = require("fluent-ffmpeg");

function convertToMp3(options) {
  function command(file) {
    return ffmpeg(file).renice(15).outputOptions("-codec:a libmp3lame");
  }
  command.extension = "mp3";

  return command;
}

module.exports = {
  convertToMp3,
};
