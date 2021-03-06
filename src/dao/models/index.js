const log = require("debug")("express:database");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  logging: (message) => {
    log(message);
  },
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  StoreModel: require("./store")(sequelize, Sequelize),
};
