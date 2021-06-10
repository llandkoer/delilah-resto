const { validationResult } = require("express-validator");

const sequelize = require("../connection");

const getAllOrders = async (req, res) => {
  try {
    const orders = await sequelize.query(`SELECT * FROM orders`, {
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

    if (Number.isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Order ID is NaN" });
    }

    const order = await sequelize.query(`SELECT * FROM orders WHERE order_id = ${id}`, {
      type: sequelize.QueryTypes.SELECT,
    });

    if (!order[0]) {
      return res.status(400).json({ message: "Order does not exist" });
    }

    await sequelize.query(`UPDATE orders SET order_state_id = ${order_state_id} WHERE order_id = ${id}`, {
      type: sequelize.QueryTypes.UPDATE,
    });

    const updated_order = await sequelize.query(`SELECT * FROM orders WHERE order_id = ${id}`, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json({ message: "Your order state have been updated", updated_order });
  } catch (error) {
    res.status(500).json({ error, message: "There is a mistake on server" });
  }
};

const createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { id, address, products, payment_method_id } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ message: "Product must be an array" });
    }

    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      if (Number.isNaN(element)) {
        return res.status(400).json({ message: `Product ID on index ${i} is NaN` });
      }
    }

    const productPrices = [];
    let details = {};

    for (let i = 0; i < products.length; i++) {
      details[products[i]] = (details[products[i]] || 0) + 1;
      const product = await sequelize.query(`SELECT * FROM products WHERE product_id = ${products[i]}`, {
        type: sequelize.QueryTypes.SELECT,
      });
      if (!product[0]) {
        return res.status(400).json({ message: `Product ID on index ${i} does not exist` });
      }
      productPrices.push(product[0].price);
    }

    let finalCost = 0;
    productPrices.forEach((element) => {
      finalCost += element;
    });

    details = JSON.stringify(details);

    await sequelize.query(
      `INSERT INTO orders (user_id,order_state_id,details,final_cost,payment_method_id,address) VALUES (${id},1,'${details}',${finalCost},${payment_method_id},'${address}')`,
      {
        type: sequelize.QueryTypes.INSERT,
      }
    );

    let lastIndex = await sequelize.query(`SELECT LAST_INSERT_ID()`, {
      type: sequelize.QueryTypes.SELECT,
    });

    lastIndex = lastIndex[0];
    const lastIndexValue = Object.values(lastIndex)[0];

    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      await sequelize.query(`INSERT INTO products_orders (product_id,product_amount,order_id) values (${element},1,${lastIndexValue});`, {
        type: sequelize.QueryTypes.INSERT,
      });
    }

    let order = await sequelize.query(`SELECT * FROM orders WHERE order_id = ${lastIndexValue}`, {
      type: sequelize.QueryTypes.SELECT,
    });
    order = order[0];
    res.status(200).json({ message: "Your order have been created", order });
  } catch (error) {
    res.status(500).json({ error, message: "There is a mistake on server" });
  }
};

const getOrderStates = async (req, res) => {
  try {
    let order_states = await sequelize.query(`SELECT * FROM order_state`, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json({ order_states });
  } catch (error) {
    res.status(500).json({ error, message: "There is a mistake on server" });
  }
};

const getPaymentMethods = async (req, res) => {
  try {
    let payment_methods = await sequelize.query(`SELECT * FROM payment_method`, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json({ payment_methods });
  } catch (error) {
    res.status(500).json({ error, message: "There is a mistake on server" });
  }
};

const getFavorites = async (req, res) => {
  try {
    const { id } = req.body;
    let favorites = await sequelize.query(`SELECT * FROM favorites WHERE user_id = ${id}`, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json({ favorites });
  } catch (error) {
    res.status(500).json({ error, message: "There is a mistake on server" });
  }
};

const setFavorite = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { id, product_id } = req.body;

    const product = await sequelize.query(`SELECT * FROM products WHERE product_id = ${product_id}`, {
      type: sequelize.QueryTypes.SELECT,
    });

    if (!product[0]) {
      res.status(400).json({ message: "Product does not exist" });
    }

    await sequelize.query(`INSERT INTO favorites (user_id,product_id) VALUES (${id},${product_id})`, {
      type: sequelize.QueryTypes.INSERT,
    });
    res.status(200).json({ message: "Favorite created successfully" });
  } catch (error) {
    res.status(500).json({ error, message: "There is a mistake on server" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { order_id } = req.query;

    if (Number.isNaN(parseInt(order_id))) {
      res.status(400).json({ message: `${order_id} is NaN` });
    }

    const order = await sequelize.query(`SELECT * FROM orders WHERE order_id = ${order_id}`, {
      type: sequelize.QueryTypes.SELECT,
    });

    if (order.length === 0) {
      return res.status(404).json({ message: `Order with ID ${order_id} does not exist` });
    }

    await sequelize.query(`DELETE FROM products_orders WHERE order_id = ${order_id}`, {
      type: sequelize.QueryTypes.DELETE,
    });

    await sequelize.query(`DELETE FROM orders WHERE order_id = ${order_id}`, {
      type: sequelize.QueryTypes.DELETE,
    });

    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "There is a mistake on server" });
  }
};

exports.getAllOrders = getAllOrders;
exports.updateOrderState = updateOrderState;
exports.createOrder = createOrder;
exports.getOrderStates = getOrderStates;
exports.getPaymentMethods = getPaymentMethods;
exports.getFavorites = getFavorites;
exports.setFavorite = setFavorite;
exports.deleteOrder = deleteOrder;
