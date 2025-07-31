// app.js
const express = require('express');
const app = express();
app.use(express.json());

// routes
app.get('/dinosaurs', (req, res) => {
  res.json([{ id: 1, name: 'T‑Rex' }]);
});

// etc.

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Parc1 API listening on ${port}`));
