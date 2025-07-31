const mongoose = require('mongoose');

const keeperSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 18 // âge minimum pour être gardien
    },
    dateStart: {
        type: Date,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    sector: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Keeper', keeperSchema);
