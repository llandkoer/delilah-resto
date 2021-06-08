const sequelize = require("../connection");

const createProduct = async (req, res) => {
  let {
    name,
    price,
    photo
  } = req.body

  

  const arrayInsertProduct = [`${name}`, `${price}`, `${photo}`]

  try {

    if (name == undefined || price == undefined || photo == undefined) {
      res.status(400).json({
        message: "enter all data (name, price and photo(url))"
      })
    } else {
      const send = await sequelize.query(
        "INSERT INTO products(name, price, photo) VALUES( ?, ?, ?)", {
          replacements: arrayInsertProduct,
          type: sequelize.QueryTypes.INSERT
        })
      res.status(200).json({
        messange: "Successfully created product"
      })
    }
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message:"Incorrect data"
    })
  }

}

const getAllProducts = async (req, res) => {
  try {
    const response = await sequelize.query('SELECT * FROM products ORDER BY price ASC')
    res.status(200).send(response[0])

  } catch {
    (error => {
      console.error(error)
      res.status(500).json({
        message:"server error"
      })
    })
  }
}

const deleteProduct = async (req, res) => {

  try {
    const {
      id
    } = req.query;
    console.log(id)
    //haga un select guarda en una variable el select si exite 
    let confirm = await sequelize.query(`SELECT * FROM products WHERE product_id = ${id}`)
    console.log(confirm[0].length)
    
    if (confirm[0].length > 0) {
      let resp = await sequelize.query(`DELETE FROM products WHERE product_id = ${id}`, {
        type: sequelize.QueryTypes.DELETE,
      })
      console.log(resp)
      res.status(200).json({
        messange: "Product successfully deleted"
      })
    } 
    else {
      res.status(400).json({
        message: "id not existing"
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error,
      message: "There is a mistake on server"
    })
  }
}

const putProduct = async (req, res) => {

  try {

    const {
      id
    } = req.params
    let {
      name,
      price,
      photo
    } = req.body

    resp = await sequelize.query(`UPDATE products SET name = '${name}', price = ${price}, photo = '${photo}' WHERE product_id = ${id}`, {
      type: sequelize.QueryTypes.UPDATE,
    })

    res.status(200).json({
      message: "Product successfully updated"
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Server error"
    })
  }


}

exports.deleteProduct = deleteProduct;

exports.createProduct = createProduct;

exports.getAllProducts = getAllProducts

exports.putProduct = putProduct