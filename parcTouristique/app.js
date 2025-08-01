const express = require('express');
const mongoose = require('mongoose');
const app = express();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/parcTouristique';

mongoose.connect(MONGO_URI)
  .then(() => console.log(' Connected to MongoDB'))
  .catch((err) => console.error(' MongoDB connection error:', err));
app.use(express.json());

const errorHandler = require('./src/middleware/errorHandler');

const dinosaurRoutes = require('./src/routes/dinosaur');
const incidentRoutes = require('./src/routes/incident');
const keeperRoutes = require('./src/routes/keeper');

app.use('/api/dinosaurs', dinosaurRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/keepers', keeperRoutes);


app.use(errorHandler);

const port = process.env.PORT || 3000;

console.log("Testing the workflow")
app.listen(port, () => {
  console.log(` ParcTouristique API listening on port ${port}`);
});
