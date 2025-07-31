const express = require('express');
const app = express();

const parc1 = require('./parc1/app');
const parc2 = require('./parc2/app');

app.use('/parc1', parc1);
app.use('/parc2', parc2);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Main server running on port ${port}`));
