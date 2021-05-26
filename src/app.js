const express = require("express");

const morgan = require("morgan");

const helmet = require("helmet");

const app = express();

const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute")

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());

// Routes
app.use("/api/v1.0/users", authRoute);

app.use("/api/v1.0/products", productRoute);

module.exports = app;
