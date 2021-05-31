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

// const user = {
//   id: config.jwt.user,
//   label: "user"
// }

router.get("/all-orders", verifyToken.verifyToken(admin.id, admin.label), ordersController.getAllOrders);
router.put("/update-state/:id", verifyToken.verifyToken(admin.id, admin.label), ordersMiddlewares.updateOrderStateValidations(), ordersController.updateOrderState);

module.exports = router;