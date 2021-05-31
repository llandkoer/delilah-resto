const { validationResult } = require("express-validator");

const { config } = require("../config/config");

const sequelize = require("../connection");

const getAllOrders = async (req, res) => {
  try {
    let orders = await sequelize.query(`SELECT * FROM orders`, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error, message: "There is a mistake on server" });
  }
}

exports.getAllOrders = getAllOrders;