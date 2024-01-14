const mongoose = require("mongoose");

const jobPositionSchema = new mongoose.Schema({
    jobPosition: String,
    status: String
});

module.exports = mongoose.model("jobPositions", jobPositionSchema);