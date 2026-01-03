const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  employeeId: String,
  companyName: String,
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  role: { type: String, enum: ["ADMIN", "EMPLOYEE"] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
