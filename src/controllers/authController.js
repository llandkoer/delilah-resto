const jwt = require("jsonwebtoken");

const config = require("../config/config");

const sequelize = require("../connection");

const encryptPassword = require("../middlewares/encryptPassword");

const createUser = async (req, res) => {
  const { username, full_name, email, phone_number, address, role_id, password } = req.body;
  const arrayInsertUser = [`${username}`, `${full_name}`, `${email}`, `${phone_number}`, `${address}`, `${role_id}`, `${password}`];

  try {
    // TODO: Add encrypt function definition
    // TODO: Validations
    arrayInsertUser[6] = await encryptPassword(password);
    const result = await sequelize.query(
      "INSERT INTO users(username, full_name, email, phone_number, address, role_id, password) VALUES( ?, ?, ?, ?, ?, ?, ?)",
      { replacements: arrayInsertUser, type: sequelize.QueryTypes.INSERT },
    );
    // ! Use JWT just when loggin
    // TODO: Sign just username and role
    const token = jwt.sign({}, config.jwt.secretKey, {
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

exports.createUser = createUser;
exports.loginUser = loginUser;
exports.verifyToken = verifyToken;
