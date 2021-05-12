const { Router } = require("express");

const router = Router();

const authController = require("../controllers/authController");

router.post("/signup");

router.post("/login");

router.post("/me");

module.exports = router;
