const express = require("express");
const routes = require("./routes");
const db = require("./dao/models");

const app = express();
db.sequelize.sync();

app.use(express.json());
app.use(routes);

module.exports = app;
