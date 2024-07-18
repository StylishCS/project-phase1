const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function adminLoginController(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email: email, isAdmin: true });
    console.log(admin);
    if (!admin) {
      return res.status(404).json("Wrong Email or Password");
    }
    const valid = bcrypt.compareSync(password, admin.password);
    if (!valid) {
      return res.status(404).json("Wrong Email or Password");
    }
    let adminWithoutPassword = { ...admin };
    delete adminWithoutPassword._doc.password;
    adminWithoutPassword = adminWithoutPassword._doc;
    const token = jwt.sign(
      { ...adminWithoutPassword },
      process.env.JWT_ADMIN_SECRET,
      {
        expiresIn: "8h",
      }
    );
    return res.status(200).json({ user: adminWithoutPassword, token: token });
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function createAdminController(req, res) {
  try {
    let { email, password, age, username } = req.body;
    if (!email || !password || !age || !username) {
      return res.status(400).json("Invalid Credentials");
    }
    let admin = await User.findOne({ email: email });
    if (admin) {
      return res.status(400).json("Admin Already Exist");
    }
    password = bcrypt.hashSync(password, 10);
    admin = new User({ email, password, age, username, isAdmin: true });
    await admin.save();
    let adminWithoutPassword = { ...admin };
    delete adminWithoutPassword._doc.password;
    adminWithoutPassword = adminWithoutPassword._doc;

    return res.status(201).json(adminWithoutPassword);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { adminLoginController, createAdminController };
