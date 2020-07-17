const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./config');
const controller = require('./controller');

// App definition
const app = express();

// App settings
app.use(express.json());
app.use(cookieParser());

// Router
app.post("/auth/sign-in", controller.signIn);
app.post("/auth/sign-up", controller.signUp);
app.get("/movies", controller.getMovies);
app.post("/user-movies", controller.addUserMovie);
app.delete("/user-movies/:userMovieId", controller.deletUserMovie);

// Server initialization
app.listen(config.port, (error) => {
  if (error) throw new Error('Server error');
  console.log(`Listening http://localhost:${config.port}`);
});
