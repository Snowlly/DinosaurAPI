const express = require('express');
const router = express.Router();
const Incident = require('../models/incident');

// GET /api/incidents - Get all incidents with populated keepers
router.get('/', async (req, res) => {
    try {
        const incidents = await Incident.find().populate('assignedKeepers');
        res.json(incidents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/incidents/:id - Get one incident
router.get('/:id', async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id).populate('assignedKeepers');
        if (!incident) return res.status(404).json({ error: 'Incident not found' });
        res.json(incident);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/incidents - Create a new incident
router.post('/', async (req, res) => {
    try {
        const incident = new Incident(req.body);
        const saved = await incident.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/incidents/:id - Update an incident
router.put('/:id', async (req, res) => {
    try {
        const updated = await Incident.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).populate('assignedKeepers');
        if (!updated) return res.status(404).json({ error: 'Incident not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/incidents/:id - Delete an incident
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Incident.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Incident not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
