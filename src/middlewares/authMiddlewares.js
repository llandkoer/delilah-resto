const { check } = require("express-validator");

exports.signupValidations = () => [
  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 255 })
    .withMessage("Username cannot be longer than 255 characters"),
  check("full_name")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 5, max: 255 })
    .withMessage("Full name must be between 5 and 255 characters long"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid")
    .isLength({ max: 255 })
    .withMessage("Email cannot be longer than 255 characters"),
  check("phone_number")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone(["es-CO", "es-AR"])
    .withMessage("Phone number is not valid"),
  check("address")
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ max: 255 })
    .withMessage("Address cannot be longer than 255 characters"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 10, max: 255 })
    .withMessage("Password must be between 10 and 255 characters long"),
];

exports.loginValidations = () => [check("email").isEmail().withMessage("Email is not valid"), check("password").notEmpty().withMessage("Password is required")];
