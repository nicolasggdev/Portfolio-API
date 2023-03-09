const { Sequelize } = require("sequelize");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const database = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  // database: process.env.DB,
  port: process.env.DB_PORT,
  dialect: "postgres",
  logging: false
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false
  //   }
  // }
});

module.exports = { database };
