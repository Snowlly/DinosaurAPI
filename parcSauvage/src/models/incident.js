const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        required: true
    },
    isDone: {
        type: Boolean,
        default: false,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedKeepers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Keeper'
    }],
    dateCreation: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Incident', incidentSchema);
