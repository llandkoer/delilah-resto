const express = require("express");

const app = express();

const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute")

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1.0/users", authRoute);

app.use("/api/v1.0/products", productRoute);

module.exports = app;
