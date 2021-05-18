require("dotenv").config();

const config = {
  db: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
  },
  jwt: {
    secretKey: process.env.JWT_kEY,
  },
};

module.exports = { config };
