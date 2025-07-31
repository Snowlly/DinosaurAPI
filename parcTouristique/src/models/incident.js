const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    title: { type: String },
    severity: { type: String, enum: ["low","medium","high","critical"], required: true },
    isDone: { type: Boolean, default: false },
    description: { type: String, required: true },
    assignedKeeper: { type: mongoose.Schema.Types.ObjectId, ref: 'Keeper', required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Incident', incidentSchema);