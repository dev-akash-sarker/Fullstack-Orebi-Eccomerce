// Using Node.js `require()`
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enu: ["Admin", "Merchant", "User"], default: "User" },
  otp: { type: String, default: null },
  emailVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("users", userSchema);
