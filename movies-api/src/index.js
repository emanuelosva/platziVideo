const express = require('express');
const config = require('../config');
const moviesRouter = require('./routes/movies');

// --- App definition ---
const app = express();

// --- Routes ---
moviesRouter(app);

// --- Server initilization ---
app.listen(config.port, (err) => {
  if (err) throw new Error('Server Error');
  console.log(`Server running on http://localhost:${config.port}`);
});
