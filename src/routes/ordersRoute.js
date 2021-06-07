const { Router } = require("express");

const router = Router();

const ordersController = require("../controllers/ordersController");
const ordersMiddlewares = require("../middlewares/ordersMiddlewares");
const verifyToken = require("../middlewares/verifyToken");

const { config } = require("../config/config");

const admin = {
  id:config.jwt.admin,
  label: "admin",
};

const user = {
  id: config.jwt.user,
  label: "client"
}

router.get("/all-orders", verifyToken.verifyToken(admin.id, admin.label), ordersController.getAllOrders);
router.get("/order-states", verifyToken.verifyToken(admin.id, admin.label), ordersController.getOrderStates);
router.get("/payment-methods", verifyToken.verifyToken(admin.id, admin.label), ordersController.getPaymentMethods);
router.put("/update-state/:id", verifyToken.verifyToken(admin.id, admin.label), ordersMiddlewares.updateOrderStateValidations(), ordersController.updateOrderState);

router.post("/create-order", verifyToken.verifyToken(user.id, user.label), ordersMiddlewares.createOrderValidations(),ordersController.createOrder);
router.get("/all-favorites", verifyToken.verifyToken(user.id, user.label), ordersController.getFavorites);
router.post("/set-favorite", verifyToken.verifyToken(user.id, user.label), ordersMiddlewares.setFavoriteValidations(),ordersController.setFavorite);


module.exports = router;