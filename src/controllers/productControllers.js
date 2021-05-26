const sequelize = require("../connection");

const createProduct = async (req, res) => {
  let {
    name,
    price,
    photo
  } = req.body

  const arrayInsertProduct = [`${name}`, `${price}`, `${photo}`]

  try {
    const send = await sequelize.query(
      "INSERT INTO products(name, price, photo) VALUES( ?, ?, ?)", {
        replacements: arrayInsertProduct,
        type: sequelize.QueryTypes.INSERT
      })
    res.status(200).json({
      messange: "Producto creado exitosamente"
    })
    console.log(send)
  } catch (error) {
    console.error(error)
  }

}

const getAllProducts = async (req,res) => {
  try {
    const response = await sequelize.query('SELECT * FROM products ORDER BY price ASC')
    res.status(200).send(response[0])

  } catch {
    (error => {
      console.error(error)
    })
  }
}


exports.createProduct = createProduct;

exports.getAllProducts = getAllProducts