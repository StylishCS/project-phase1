const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

async function UserPrivileges(req, res, next) {
  try {
    if (!req.header("Authorization")) {
      return res.status(403).json("FORBIDDEN");
    }
    const key = req.header("Authorization").split(" ")[0];
    const token = req.header("Authorization").split(" ")[1];
    if (key !== process.env.JWT_USER_KEY || !token) {
      return res.status(403).json("FORBIDDEN");
    }

    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
    const user = await User.findById(decoded.userWithoutPassword._id)
      .populate("moviesWatchLater")
      .select("-password");
    if (!user) {
      return res.status(403).json("FORBIDDEN");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json("FORBIDDEN");
  }
}

module.exports = UserPrivileges;
