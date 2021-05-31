const { validationResult } = require("express-validator");

// const { config } = require("../config/config");

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
};

const updateOrderState = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { order_state_id } = req.body;

    await sequelize.query(`UPDATE orders SET order_state_id = ${order_state_id} WHERE order_id = ${id}`, {
      type: sequelize.QueryTypes.UPDATE,
    })

    const order = await sequelize.query(`SELECT * FROM orders WHERE order_id = ${id}`, {
      type: sequelize.QueryTypes.SELECT,
    })
    res.status(200).json({ message: "Your order state have been updated", order });
  } catch (error) {
    res.status(500).json({ error, message: "There is a mistake on server" });
  }
};

exports.getAllOrders = getAllOrders;
exports.updateOrderState = updateOrderState;
