
const configs = require(`./config.${process.env.NODE_ENV || "dev"}`);

module.exports = configs.database;