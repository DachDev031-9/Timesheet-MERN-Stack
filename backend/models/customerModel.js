const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    companyName: String,
    email: String,
    firstName: String,
    lastName: String,
    telephoneNumber: String,
    status: String
});

module.exports = mongoose.model("customers", customerSchema);
