const { check } = require("express-validator");

exports.updateOrderStateValidations = () => [
  check("order_state_id")
    .notEmpty()
    .withMessage("State ID is required")
    .isNumeric()
    .withMessage("State ID doesn't exist")
    .isLength({ max: 1 })
    .withMessage("State ID is not valid"),
];

exports.createOrderValidations = () => [
  check("payment_method_id")
    .notEmpty()
    .withMessage("Payment method ID is required")
    .isInt({ min: 1, max: 2 })
    .withMessage("Payment method ID is not valid"),
  check("products")
    .notEmpty()
    .withMessage("Products ID array is required"),
];

exports.setFavoriteValidations = () => [
  check("product_id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isInt()
    .withMessage("Product ID is not valid")
]