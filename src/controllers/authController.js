const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const { config } = require("../config/config");

const sequelize = require("../connection");

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { username, full_name, email, phone_number, address, password } = req.body;
    if (!username || !full_name || !email || !phone_number || !address || !password) {
      return res.status(401).json({ message: "Missing data. Please fill all require inputs" });
    }

    const user = await sequelize.query(`SELECT user_id FROM users WHERE email = ? OR username = ? OR phone_number = ?`, {
      replacements: [`${email}`, `${username}`, `${phone_number}`],
      type: sequelize.QueryTypes.SELECT,
    });

    if (user.length !== 0) {
      return res.status(409).json({ message: "Username, email or phone number already exist on our database" });
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const arrayInsertUser = [`${username}`, `${full_name}`, `${email}`, `${phone_number}`, `${address}`, `2`, `${password}`];

    await sequelize.query("INSERT INTO users(username, full_name, email, phone_number, address, role_id, password) VALUES( ?, ?, ?, ?, ?, ?, ?)", {
      replacements: arrayInsertUser,
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(201).json({ message: "User has been created" });
  } catch (error) {
    res.status(500).json({ error, message: "There is a mistake on server" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email && !username) {
      return res.status(403).json({ auth: false, token: null, message: "Email or username required" });
    }

    let user = await sequelize.query(`SELECT user_id, role_id, password FROM users WHERE email = ? OR username = ?`, {
      replacements: [`${email}`, `${username}`],
      type: sequelize.QueryTypes.SELECT,
    });

    user = user[0];
    if (!user) {
      return res.status(404).json({ auth: false, token: null, message: "Email or username does not exist" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ auth: false, token: null, message: "Wrong password" });
    }

    const token = jwt.sign({ id: user.user_id, role: user.role_id }, config.jwt.secretKey, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(201).json({ auth: true, token });
  } catch (error) {
    res.status(500).json({ error, message: "There is a mistake on server" });
  }
};

exports.createUser = createUser;
exports.loginUser = loginUser;
