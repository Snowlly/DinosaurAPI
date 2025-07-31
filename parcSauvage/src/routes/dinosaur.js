const express = require('express');
const router = express.Router();
const Dinosaur = require('../models/dinosaur');

// GET /api/dinosaurs - Get all dinosaurs
router.get('/', async (req, res) => {
    try {
        const dinosaurs = await Dinosaur.find();
        res.json(dinosaurs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/dinosaurs/:id - Get one dinosaur by ID
router.get('/:id', async (req, res) => {
    try {
        const dinosaur = await Dinosaur.findById(req.params.id);
        if (!dinosaur) return res.status(404).json({ error: 'Dinosaur not found' });
        res.json(dinosaur);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/dinosaurs - Create a new dinosaur
router.post('/', async (req, res) => {
    try {
        const dinosaur = new Dinosaur(req.body);
        const saved = await dinosaur.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/dinosaurs/:id - Update a dinosaur
router.put('/:id', async (req, res) => {
    try {
        const updated = await Dinosaur.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updated) return res.status(404).json({ error: 'Dinosaur not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/dinosaurs/:id - Delete a dinosaur
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Dinosaur.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Dinosaur not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
