const pck = require("../package.json");

module.exports = {
  env: process.env.NODE_ENV || "development",
  version: `${pck.version}-${Date.now()}`,
  port: process.env.PORT || 3000,
  fileSizeLimit: 524288000,
  timeout: 3600000,
};
