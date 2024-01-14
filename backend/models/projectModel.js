const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectName: String,
    customerName: mongoose.Schema.Types.ObjectId,
    mainResponsible: mongoose.Schema.Types.ObjectId,
    responsibleTeam: [mongoose.Schema.Types.ObjectId],
    startDate: { type: Date },
    endDate: { type: Date },
    status: String
});

module.exports = mongoose.model("projects", projectSchema);