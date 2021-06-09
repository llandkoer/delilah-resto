const sequelize = require("../connection");

const createProduct = async (req, res) => {
  const { name, price, photo } = req.body;

  const arrayInsertProduct = [`${name}`, `${price}`, `${photo}`];

  try {
    if (!name || !price || !photo) {
      res.status(400).json({
        message: "enter all data (name, price and photo(url))",
      });
    } else {
      await sequelize.query("INSERT INTO products(name, price, photo) VALUES( ?, ?, ?)", {
        replacements: arrayInsertProduct,
        type: sequelize.QueryTypes.INSERT,
      });
      res.status(200).json({
        messange: "Successfully created product",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Incorrect data",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const response = await sequelize.query("SELECT * FROM products ORDER BY price ASC");
    res.status(200).send(response[0]);
  } catch {
    (error) => {
      console.error(error);
      res.status(500).json({
        message: "server error",
      });
    };
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.query;

    if (Number.isNaN(parseInt(id))) {
      res.status(400).json({ message: `${id} is NaN` });
    }

    const product = await sequelize.query(`SELECT * FROM products WHERE product_id = ${id}`, {
      type: sequelize.QueryTypes.SELECT,
    });

    if (product.length === 0) {
      return res.status(404).json({ message: `Product with ID ${id} does not exist` });
    }

    await sequelize.query(`DELETE FROM products WHERE product_id = ${id}`, {
      type: sequelize.QueryTypes.DELETE,
    });

    res.status(200).json({ message: "Product successfully deleted", deleted_product: product[0] });
  } catch (error) {
    res.status(500).json({ error, message: "There is a mistake on server" });
  }
};

const putProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, photo } = req.body;

    resp = await sequelize.query(`UPDATE products SET name = '${name}', price = ${price}, photo = '${photo}' WHERE product_id = ${id}`, {
      type: sequelize.QueryTypes.UPDATE,
    });

    res.status(200).json({
      message: "Product successfully updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.deleteProduct = deleteProduct;

exports.createProduct = createProduct;

exports.getAllProducts = getAllProducts;

exports.putProduct = putProduct;
