const express = require('express');
const app = express();

app.use(express.json());

const errorHandler = require('./src/middleware/errorHandler');


const dinosaurRoutes = require('./src/routes/dinosaur');
const incidentRoutes = require('./src/routes/incident');
const keeperRoutes = require('./src/routes/keeper');

app.use('/dinosaurs', dinosaurRoutes);
app.use('/incidents', incidentRoutes);
app.use('/keepers', keeperRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`ParcTouristique API en écoute sur le port ${port}`);
});
