const data = require("knex");
const config = require("../knexfile");

const environment = process.env.DATABASE_URL ? "production" : "development";
module.exports = data(config[environment]);
