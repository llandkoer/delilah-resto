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

const user = {
  id: config.jwt.user,
  label: "client"
}

const productsMiddleware = require("../middlewares/productsMiddlewares");

const productControllers = require("../controllers/productControllers");


router.post("/create", verifyToken.verifyToken(admin.id, admin.label) , productControllers.createProduct);

router.get("/all-products-admin", verifyToken.verifyToken(admin.id, admin.label) , productControllers.getAllProducts);

router.get("/all-products", verifyToken.verifyToken(user.id, user.label) , productControllers.getAllProducts);

router.delete("/delete", verifyToken.verifyToken(admin.id, admin.label), productControllers.deleteProduct);

router.put('/update/:id', productControllers.putProduct)

module.exports = router;