const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config/config");

const sequelize = require("../connection");

const createUser = async (req, res) => {
  let { username, full_name, email, phone_number, address, role_id, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const arrayInsertUser = [`${username}`, `${full_name}`, `${email}`, `${phone_number}`, `${address}`, `${role_id}`, `${password}`];

  try {
    // TODO: Validations
    const result = await sequelize.query(
      "INSERT INTO users(username, full_name, email, phone_number, address, role_id, password) VALUES( ?, ?, ?, ?, ?, ?, ?)",
      { replacements: arrayInsertUser, type: sequelize.QueryTypes.INSERT }
    );
    // ! Use JWT just when loggin
    // TODO: Sign just username and role
    // const token = jwt.sign({}, config.jwt.secretKey, {
    //   expiresIn: 60 * 60 * 24,
    // });

    console.log(result);
    res.status(201).json({ auth: true });
  } catch (error) {
    console.log(`Insertion error: ${error}`);
  }
};

const loginUser = (req, res, next) => {};

const verifyToken = (req, res, next) => {};

exports.createUser = createUser;
exports.loginUser = loginUser;
exports.verifyToken = verifyToken;
