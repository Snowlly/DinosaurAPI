const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URL || 'mongodb://mongo:27017/parc_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error('Erreur MongoDB :', err));

// Middleware
app.use(express.json());

// Routes
const dinosaurRoutes = require('./src/routes/dinosaur');
const keeperRoutes = require('./src/routes/keeper');
const incidentRoutes = require('./src/routes/incident');

app.use('/api/dinosaurs', dinosaurRoutes);
app.use('/api/keepers', keeperRoutes);
app.use('/api/incidents', incidentRoutes);

// Port
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Parc1 API listening on ${port}`));
