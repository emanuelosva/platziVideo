const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const helmet = require('helmet');
const config = require('./config');
const controller = require('./controller');

// Oauth Strategy
require('./auth/strategys/oauth');

// Google Strategy
require('./auth/strategys/google');

// Google Strategy
require('./auth/strategys/twitter');

// App definition
const app = express();

// App settings
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: config.auth.sessionSecret }))
app.use(passport.initialize());
app.use(passport.session());

// Router
app.post("/auth/sign-in", controller.signIn);

app.post("/auth/sign-up", controller.signUp);

app.get('/auth/google-oauth',
  passport.authenticate('google-oauth', {
    scope: ['email', 'profile', 'openid'],
  }),
);

app.get('/auth/google-oauth/callback',
  passport.authenticate('google-oauth', {
    session: false,
  }),
  controller.providerOauth,
);

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile', 'openid']
  }),
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    session: false,
  }),
  controller.providerOauth,
);

app.get('/auth/twitter',
  passport.authenticate('twitter'),
);

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    session: false,
  }),
  controller.providerOauth,
);

app.get("/movies", controller.getMovies);

app.post("/user-movies", controller.addUserMovie);

app.delete("/user-movies/:userMovieId", controller.deletUserMovie);

// Server initialization
app.listen(config.port, (error) => {
  if (error) throw new Error('Server error');
  console.log(`Listening http://localhost:${config.port}`);
});
