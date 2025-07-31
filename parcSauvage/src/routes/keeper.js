const express = require('express');
const router = express.Router();
const Keeper = require('../models/keeper');

// GET /api/keepers - Get all keepers
router.get('/', async (req, res) => {
    try {
        const keepers = await Keeper.find();
        res.json(keepers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/keepers/:id - Get one keeper
router.get('/:id', async (req, res) => {
    try {
        const keeper = await Keeper.findById(req.params.id);
        if (!keeper) return res.status(404).json({ error: 'Keeper not found' });
        res.json(keeper);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/keepers - Create a new keeper
router.post('/', async (req, res) => {
    try {
        const keeper = new Keeper(req.body);
        const saved = await keeper.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/keepers/:id - Update a keeper
router.put('/:id', async (req, res) => {
    try {
        const updated = await Keeper.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updated) return res.status(404).json({ error: 'Keeper not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/keepers/:id - Delete a keeper
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Keeper.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Keeper not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
