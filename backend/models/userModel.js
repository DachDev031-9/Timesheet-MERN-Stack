const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  address: String,
  telephoneNumber: String,
  jobPosition: mongoose.Schema.Types.ObjectId,
  role: String,
  status: String,
  startDate: { type: Date },
  endDate: { type: Date }
});

module.exports = mongoose.model("users", userSchema);
