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