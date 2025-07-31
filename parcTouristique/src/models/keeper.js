const mongoose = require('mongoose');

const keeperSchema = new mongoose.Schema({
    name: { type: String },
    age: { type: Number, required: true },
    dateStart: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
    sector: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('keeper', keeperSchema);