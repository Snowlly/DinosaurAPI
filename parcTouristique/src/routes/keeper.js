const express = require('express');
const router = express.Router();
const Keeper = require('../models/keeper');

// GET all keepers
router.get('/', async (req, res, next) => {
  try {
    const keepers = await Keeper.find();
    res.json(keepers);
  } catch (err) {
    next(err);
  }
});

// POST new keeper
router.post('/', async (req, res, next) => {
  try {
    const { name, age, dateStart, available, sector } = req.body;
    const newKeeper = new Keeper({ name, age, dateStart, available, sector });
    const saved = await newKeeper.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

// GET one keeper by ID
router.get('/:id', async (req, res, next) => {
  try {
    const keeper = await Keeper.findById(req.params.id);
    if (!keeper) return res.status(404).json({ error: 'Keeper not found' });
    res.json(keeper);
  } catch (err) {
    next(err);
  }
});

// PUT update keeper
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Keeper.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Keeper not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE keeper
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Keeper.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Keeper not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;