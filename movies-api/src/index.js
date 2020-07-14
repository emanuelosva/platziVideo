const express = require('express');
const config = require('../config');

// App definition
const app = express();

// Routes
app.get('/', (req, res) => res.send('Hello'));

// Server initilization
app.listen(config.port, (err) => {
  if (err) throw new Error('Server Error');
  console.log(`Server running on http://localhost:${config.port}`);
});
