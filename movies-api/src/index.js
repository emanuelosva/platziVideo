const express = require('express');
const config = require('../config');
const moviesRouter = require('./routes/movies');

// --- App definition ---
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
moviesRouter(app);

// --- Server initilization ---
app.listen(config.port, (err) => {
  if (err) throw new Error('Server Error');
  console.log(`Server running on http://localhost:${config.port}`);
});
