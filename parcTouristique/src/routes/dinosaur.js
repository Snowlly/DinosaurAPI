const express = require('express');
const router = express.Router();
const Dinosaur = require('../models/dinosaur');

router.get('/', async (req, res, next) => {
  try {
    const dinosaurs = await Dinosaur.find();
    res.json(dinosaurs);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newDino = new Dinosaur(req.body);
    const savedDino = await newDino.save();
    res.status(201).json(savedDino);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const dino = await Dinosaur.findById(req.params.id);
    if (!dino) return res.status(404).json({ error: 'Dinosaur not found' });
    res.json(dino);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedDino = await Dinosaur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDino) return res.status(404).json({ error: 'Dinosaur not found' });
    res.json(updatedDino);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedDino = await Dinosaur.findByIdAndDelete(req.params.id);
    if (!deletedDino) return res.status(404).json({ error: 'Dinosaur not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
