const express = require('express');
const router = express.Router();
const Incident = require('../models/incident');

// GET all incidents
router.get('/', async (req, res, next) => {
  try {
    const incidents = await Incident.find().populate('assignedKeeper');
    res.json(incidents);
  } catch (err) {
    next(err);
  }
});

// POST create incident
router.post('/', async (req, res, next) => {
  try {
    const { title, severity, isDone, description, assignedKeeper, date } = req.body;
    const newIncident = new Incident({ title, severity, isDone, description, assignedKeeper, date });
    const saved = await newIncident.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

// GET one by ID
router.get('/:id', async (req, res, next) => {
  try {
    const incident = await Incident.findById(req.params.id).populate('assignedKeeper');
    if (!incident) return res.status(404).json({ error: 'Incident not found' });
    res.json(incident);
  } catch (err) {
    next(err);
  }
});

// PUT update
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) return res.status(404).json({ error: 'Incident not found' });

    const populated = await updated.populate('assignedKeepers');
    res.json(populated);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Incident.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Incident not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;