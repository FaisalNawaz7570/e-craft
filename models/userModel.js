const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true, //indexing
    required: true, // TODO: check email pattern //validation
    lower: true, //user@gmail.com & User@gmail.com //modification
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        //this -> document
        return val === this.password;
      },
      message: "password not match",
    },
  },
});

userSchema.pre("save", async function (next) {
  //this -> document
  //TODO ->  check if password changed then do the following
  if (!this.isModified("password")) return next();
  var encryptedPassword = await bcrypt.hash(this.password, 12); // Number brute force attack
  this.password = encryptedPassword;
  this.confirmPassword = undefined;
  next();
});

var User = new mongoose.model("user", userSchema);

module.exports = User;
