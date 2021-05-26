const isClient = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({ auth: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, config.jwt.secretKey);
    if(decoded.role !== 2){
      return res.status(401).json({ auth: false, message: "User is not client" });
    }

    let result = await sequelize.query(`SELECT user_id, username, full_name, email, phone_number, address, role_id FROM users WHERE user_id = ?`, {
      replacements: [`${decoded.id}`],
      type: sequelize.QueryTypes.SELECT,
    });

    result = result[0];

    if (!result) {
      return res.status(404).json({ auth: false, message: "No user found" });
    }
    res.status(200).json({ user: result });
  } catch (error) {
    console.log(error);
  }
  next();
}

const isAdmin = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({ auth: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, config.jwt.secretKey);
    if(decoded.role !== 1){
      return res.status(401).json({ auth: false, message: "User is not admin" });
    }

    let result = await sequelize.query(`SELECT user_id, username, full_name, email, phone_number, address, role_id FROM users WHERE user_id = ?`, {
      replacements: [`${decoded.id}`],
      type: sequelize.QueryTypes.SELECT,
    });

    result = result[0];

    if (!result) {
      return res.status(404).json({ auth: false, message: "No user found" });
    }
    res.status(200).json({ user: result });
  } catch (error) {
    console.log(error);
  }
  next();
}

exports.isClient = isClient;
exports.isAdmin = isAdmin;