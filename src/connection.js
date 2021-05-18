const Sequelize = require("sequelize");
const { config } = require("./config/config");

const path = `mysql://${config.db.username}:${config.db.password}@${config.db.host}:3306/${config.db.database}`;

const sequelize = new Sequelize(path, {
  operatorsAliases: false,
  logging: true,
});

sequelize.authenticate()
  .then(() => {
    console.log("Database is connected", config.db.database);
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

module.exports = sequelize;
