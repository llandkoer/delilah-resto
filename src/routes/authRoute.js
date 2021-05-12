const { Router } = require("express");

const router = Router();

const authController = require("../controllers/authController");

router.post("/signup", authController.createUser);

router.post("/login");

router.get("/me");

module.exports = router;
