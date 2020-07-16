const express = require('express');
const config = require('./config');
const controller = require('./controller');

// App definition
const app = express();

// App settings
app.use(express.json());

// Router
app.post("/auth/sign-in", controller.singIn);
app.post("/auth/sign-up", controller.singUp);
app.get("/movies", controller.getMovies);
app.post("/user-movies", controller.addUserMovie);
app.delete("/user-movies/:userMovieId", controller.deletUserMovie);

// Server initialization
app.listen(config.port, (error) => {
  if (error) throw new Error('Server error');
  console.log(`Listening http://localhost:${config.port}`);
});
