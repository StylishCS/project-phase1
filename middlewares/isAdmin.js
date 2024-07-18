const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

async function AdminPrivileges(req, res, next) {
  try {
    if (!req.header("Authorization")) {
      return res.status(403).json("FORBIDDEN");
    }
    const key = req.header("Authorization").split(" ")[0];
    const token = req.header("Authorization").split(" ")[1];
    if (key !== process.env.JWT_ADMIN_KEY) {
      return res.status(403).json("FORBIDDEN");
    }
    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      isAdmin: true,
    });
    if (!user) {
      return res.status(403).json("FORBIDDEN");
    }
    req.admin = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json("FORBIDDEN");
  }
}

module.exports = AdminPrivileges;
