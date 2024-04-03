const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  age: {
      type: Number
  },
  weight: {
      type: Number
  },
  sex: {
      type: String,
      enum: ["Male", "Female"]
  },
  profilePic: {
      type: String 
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;