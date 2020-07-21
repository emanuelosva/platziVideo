/* eslint-disable consistent-return */
/**
 * Controller for routes callback
*/

const passport = require('passport');
const boom = require('@hapi/boom');
const axios = require('axios').default;
const config = require('../../config');

// Basic auth strategy
require('../auth/strategys/basic');

// Useful vars
const THIRTY_DAYS_IN_SEC = 2592000 * 1000;
const TWO_HOURS_IN_SEC = 7200 * 1000;
const urlApi = config.api.url;

// --- Controllers ---

const signIn = async (req, res, next) => {
  const { rememberMe } = req.body || false;

  passport.authenticate('basic', (error, data) => {
    try {
      if (error || !data) next(boom.unauthorized());

      req.login(data, { session: false }, (error) => {
        if (error) next(error);

        const { token, ...user } = data;
        const maxAgeCookie = rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC;

        res.cookie('token', token, {
          httpOnly: !config.dev,
          secure: !config.dev,
          maxAge: maxAgeCookie,
          path: '/',
        });

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

const signUp = async (req, res, next) => {
  const { body: userData } = req;
  try {
    const { data, status } = await axios({
      url: `${urlApi}/api/auth/sign-up`,
      method: 'POST',
      data: {
        email: userData.email,
        name: userData.name,
        password: userData.password,
      },
    });

    if (status !== 201) next(boom.badRequest());

    res.status(201).json({
      email: userData.email,
      name: userData.name,
      id: data.body._id,
    });
  } catch (error) {
    next(error);
  }
};

const providerOauth = (req, res, next) => {
  if (!req.user) next(boom.unauthorized());

  const { token, ...user } = req.user;
  res.cookie('token', token, {
    httpOnly: !config.dev,
    secure: !config.dev,
  });

  res.status(200).json(user);
};

const getUserMovies = async ({ userId, token }) => {
  try {
    const { data, status } = await axios({
      url: `${urlApi}/api/user-movies?userId=${userId}`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'GET',
    });

    if (status !== 201) return next(boom.badImplementation());

    res.status(201).json(data.body);
  } catch (error) {
    next(error);
  }
};

const addUserMovie = async (req, res, next) => {
  const { body: userMovie } = req;
  const { token } = req.cookies;
  try {
    const { data, status } = await axios({
      url: `${urlApi}/api/user-movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST',
      data: {
        movieId: userMovie.movieId,
        userId: userMovie.userId,
      },
    });

    if (status !== 201) return next(boom.badImplementation());

    res.status(201).json(data.body);
  } catch (error) {
    next(error);
  }
};

const deletUserMovie = async (req, res, next) => {
  const { userMovieId } = req.params;
  const { token } = req.cookies;
  try {
    const { data, status } = await axios({
      url: `${urlApi}/api/user-movies/${userMovieId}`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'DELETE',
    });

    if (status !== 200) return next(boom.badImplementation());

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signIn,
  signUp,
  providerOauth,
  getUserMovies,
  addUserMovie,
  deletUserMovie,
};
