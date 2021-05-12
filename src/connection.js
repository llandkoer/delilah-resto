const Sequelize = require("sequelize");
const { config } = require("./config/config");

const path = `mysql://${config.username}:${config.password}@${config.host}:3306/${config.database}`;

const sequelize = new Sequelize(path, {
  operatorsAliases: false,
  logging: true,
});

sequelize.authenticate()
  .then(() => {
    console.log("Database is connected", config.database);
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

module.exports = sequelize;
