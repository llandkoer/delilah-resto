const jwt = require("jsonwebtoken");

require("dotenv").config();

const sequelize = require("../connection");

const encryptPassword = require("../middlewares/encryptPassword");

const createUser = async (req, res, next) => {
  const { username, full_name, email, phone_number, address, role_id, password } = req.body;
  const arrayInsertUser = [`${username}`, `${full_name}`, `${email}`, `${phone_number}`, `${address}`, `${role_id}`, `${password}`];

  try {
    arrayInsertUser[6] = await encryptPassword(password);
    const result = await sequelize.query(
      "INSERT INTO users(username, full_name, email, phone_number, address, role_id, password) VALUES( ?, ?, ?, ?, ?, ?, ?)",
      { replacements: arrayInsertUser, type: sequelize.QueryTypes.INSERT },
    );

    const token = jwt.sign({}, process.env.JWT_KEY, {
      expiresIn: 60 * 60 * 24,
    });

    console.log(result);
    res.status(201).json({ auth: true, token });
  } catch (error) {
    console.log(`Insertion error: ${error}`);
  }
};

const loginUser = (req, res, next) => {};

const verifyToken = (req, res, next) => {};

module.exports = createUser;
module.exports = loginUser;
module.exports = verifyToken;
