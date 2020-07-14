const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const config = require('../config');
const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./network/middleware/errorHandlers');
const notFountHandler = require('./network/middleware/notFoundHandler');
const moviesRouter = require('./routes/movies');

// --- App definition ---
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
moviesRouter(app);

// --- Catch 404 error ---
app.use(notFountHandler);

// --- Error Middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// --- Server initilization ---
app.listen(config.port, (err) => {
  if (err) throw new Error('Server Error');
  console.log(`Server running on http://localhost:${config.port}`);
});
