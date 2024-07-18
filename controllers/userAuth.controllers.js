const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
async function signupUserController(req, res) {
  try {
    let { username, email, password, age } = req.body;
    if (!username || !email || !password || !age) {
      return res.status(400).json("Invalid Input");
    }
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json("User Already Exist");
    }
    password = bcrypt.hashSync(password, 10);
    user = new User({ username, email, password, age });
    await user.save();
    let userWithoutPassword = { ...user };
    delete userWithoutPassword._doc.password;
    userWithoutPassword = userWithoutPassword._doc;
    const token = jwt.sign(
      { ...userWithoutPassword },
      process.env.JWT_USER_SECRET
    );
    return res.status(201).json({ user: userWithoutPassword, token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Invalid Credentials");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("Wrong Email or Password");
    }
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(404).json("Wrong Email or Password");
    }
    let userWithoutPassword = { ...user };
    delete userWithoutPassword._doc.password;
    userWithoutPassword = userWithoutPassword._doc;
    const token = jwt.sign(
      { userWithoutPassword },
      process.env.JWT_USER_SECRET
    );
    return res.status(200).json({ user: userWithoutPassword, token: token });
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { signupUserController, loginUserController };
