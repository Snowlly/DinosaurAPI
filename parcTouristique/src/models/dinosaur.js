const mongoose = require('mongoose');

const dinosaurSchema = new mongoose.Schema({
    name: { type: String },
    specie: { type: String, required: true },
    weight: { type: String, required: true },
    height: { type: String, required: true },
    dangerLevel: { type: Number, enum: [1,2,3,4,5,6,7,8,9,10], required: true },
    diet: { type: String, required: true },
    dateBorn: { type: Date, required: true },
    enclosureId: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Dinosaur', dinosaurSchema);