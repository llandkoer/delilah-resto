const jwt = require("jsonwebtoken");

const { config } = require("../config/config");

const verifyToken = (roleId, role) => (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Token expired" });
      }

      if (decoded.role !== roleId) {
        return res.status(401).json({ message: `User is not ${role}` });
      }
      req.body.address = decoded.address;
      req.body.id = decoded.id;
      next();
    });
  } catch (error) {
    res.status(500).json({ error, message: "There was an error on server" });
  }
};

exports.verifyToken = verifyToken;
