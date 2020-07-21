/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import express from 'express';
import webpack from 'webpack';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { join } from 'path';
import helmet from 'helmet';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import reducer from '../frontend/reducers';
import serverRoutes from '../frontend/routes/serverRoutes';
import config from '../config';
import manifestMiddleware from './getManifest';
import controller from './controller';

const PORT = config.port;
const app = express();

// General settings
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: config.auth.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());

if (config.env !== 'production') {
  // Development config
  console.log('Development config');

  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const conpiler = webpack(webpackConfig);
  const serverConfig = {
    port: PORT,
    hot: true,
  };

  app.use(webpackDevMiddleware(conpiler, serverConfig));
  app.use(webpackHotMiddleware(conpiler));
} else {
  // Production config
  app.use(manifestMiddleware);
  app.use(express.static(join(__dirname, 'public')));
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable('x-powered-by');
};

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';

  return (`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href=${mainStyles} type="text/css" />
        <title>Platzi video</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src=${mainBuild} type="text/javascript"></script>
        <script src=${vendorBuild} type="text/javascript"></script>
      </body>
    </html>
  `);
};

const renderApp = async (req, res) => {
  let initialState;
  const { email, name, id, token } = req.cookies;

  try {
    // Get movies from DB
    const movieList = await axios({
      url: `${config.api.url}/api/movies`,
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => data.body);

    //Get the user List
    const userList = await axios({
      url: `${config.api.url}/api/user-movies?userId=${id}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data }) => data.body);

    const userListIds = userList.map((item) => item.movieId);
    // const myList = movieList.filter((item) => userListIds.includes(item._id));
    const myList = movieList.reduce((arr, item) => {
      if (userListIds.includes(item._id)) {
        const index = userListIds.indexOf(item._id);
        arr.push({ ...item, favoriteMovieId: userList[index]._id });
      }
      return arr;
    }, []);

    initialState = {
      user: { email, name, id },
      myList,
      trends: movieList.filter((movie) => (
        movie.contentRating === 'PG' && movie._id
      )),
      originals: movieList.filter((movie) => (
        movie.contentRating === 'G' && movie._id
      )),
    };
  } catch (error) {
    initialState = {
      user: {},
      myList: [],
      trends: [],
      original: [],
    };
  }

  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const isLogged = (initialState.user.id);
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes(isLogged))}
      </StaticRouter>
    </Provider>,
  );

  res.send(setResponse(html, preloadedState, req.manifestMiddleware));
};

// Auth routes
app.post('/auth/sign-in', controller.signIn);
app.post('/auth/sign-up', controller.signUp);

// User-Movies routes
app.post('/user-movies', controller.addUserMovie);
app.delete('/user-movies/:userMovieId', controller.deletUserMovie);

// Send first HTML from server
app.get('*', renderApp);

app.listen(PORT, (err) => {
  if (err) console.log(`ServerError -> ${err}`);
  else console.log(`Server running on http://localhost:${PORT}`);
});
