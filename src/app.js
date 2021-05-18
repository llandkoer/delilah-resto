const express = require("express");

const app = express();

const authRoute = require("./routes/authRoute");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1.0/users", authRoute);

module.exports = app;
