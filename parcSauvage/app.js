// app.js
const express = require('express');
const app = express();

const dinosaurRoutes = require('./routes/dinosaur');
const keeperRoutes = require('./routes/keeper');
const incidentRoutes = require('./routes/incident');

app.use('/api/dinosaurs', dinosaurRoutes);
app.use('/api/keepers', keeperRoutes);
app.use('/api/incidents', incidentRoutes);

app.use(express.json());

// routes
app.get('/dinosaurs', (req, res) => {
  res.json([{ id: 1, name: 'T‑Rex' }]);
});


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Parc1 API listening on ${port}`));
