const {
  Router
} = require("express");

const router = Router();

const verifyToken = require("../middlewares/verifyToken");

const {
  config
} = require("../config/config");

const admin = {
  id: config.jwt.admin,
  label: "admin",
};


const productControllers = require("../controllers/productControllers");


router.post("/create", verifyToken.verifyToken(admin.id, admin.label), productControllers.createProduct);

router.get("/allproducts", productControllers.getAllProducts);

router.delete("/delete", productControllers.deleteProduct);

router.put('/update/:id', productControllers.putProduct)

module.exports = router;