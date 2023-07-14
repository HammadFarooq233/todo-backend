const User = require("../models/user");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

async function register(user) {
  try {
    const { name, email, password } = user;

    user = await User.findOne({ email });
    if (user) throw new Error("Email is already taken");

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });

    user = await user.save();

    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_KEY
    );
  } catch (error) {
    console.log("register error", error);
    throw error;
  }
}

async function login(email, password) {
  try {
    let user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email and/or password");

    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new Error("Invalid email and/or password");

    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_KEY
    );
  } catch (error) {
    console.log("login error", error);
    throw error;
  }
}

module.exports = {
  login,
  register,
};
