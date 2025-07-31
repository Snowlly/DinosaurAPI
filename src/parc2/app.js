// app.js
const express = require('express');
const app = express();
app.use(express.json());

// routes
app.get('/dinosaurs', (req, res) => {
  res.json([{ id: 1, name: 'T‑Rex2' }]);
});


const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Parc2 API listening on ${port}`));
