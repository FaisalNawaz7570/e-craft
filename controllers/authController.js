const User = require("../models/userModel");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signJWT = (userId) => {
  return JWT.sign({ id: userId }, process.env.JWT_WEB_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.fetchUsers = async (req, res) => {
  //
  try {
    var users = await User.find();
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    //encryption
    var user = await User.create(req.body); //monogodb bson form data
    var { password, ...modifiedUser } = user.toObject(); // simple object json
    // generate JWT
    var token = signJWT(user._id);
    // console.log(user);
    res.status(200).json({
      status: "success",
      token,
      data: {
        user: modifiedUser,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    var { email, password } = req.body;
    //check if user & email exist
    if (!email || !password) {
      return res.status(404).json({
        status: "error",
        error: "please enter email and password",
      });
    }
    //fetch user whose email in given
    var user = await User.findOne({ email }).select("+password");
    // console.log(user);
    // verify password
    // encrypted password = password
    var passwordVarified = await user.passwordVerification(
      password,
      user.password
    ); //.compare("pass123pass123", hsfhsdfhsdfh)
    if (!passwordVarified || !user) {
      return res.status(404).json({
        status: "error",
        error: "envalid email or password",
      });
    }
    //generate token
    var token = signJWT(user._id);

    //send response
    var { password, ...modifiedUser } = user.toObject(); // simple object json
    res.status(200).json({
      status: "success",
      token,
      data: {
        user: modifiedUser,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};
