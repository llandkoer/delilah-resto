const { Router } = require("express");

const router = Router();

const ordersController = require("../controllers/ordersController");
const ordersMiddlewares = require("../middlewares/ordersMiddlewares");

router.post("/", ordersMiddlewares.(), ordersController.);

router.post("/", ordersMiddlewares.(), ordersController.);

module.exports = router;