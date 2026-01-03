const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  year: Number,
  lastSerial: Number,
});

module.exports = mongoose.model("Counter", counterSchema);
