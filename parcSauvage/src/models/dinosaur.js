const mongoose = require('mongoose');

const dinosaurSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    specie: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    dangerLevel: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    diet: {
        type: String,
        enum: ['carnivore', 'herbivore', 'omnivore'],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Dinosaur', dinosaurSchema);
