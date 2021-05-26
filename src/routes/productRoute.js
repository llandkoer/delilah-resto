const { Router } = require("express");

const router = Router();

const productControllers = require("../controllers/productControllers");

router.post("/create", productControllers.createProduct);

router.get("/allproducts", productControllers.getAllProducts);

module.exports = router;
