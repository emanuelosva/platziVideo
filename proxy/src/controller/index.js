/**
 * Controller for routes callback
*/
const passport = require('passport');
const boom = require('@hapi/boom');
const axios = require('axios').default;
const config = require('../config');

// Basic auth strategy
require('../auth/strategys/basic');

// Useful vars
const THIRTY_DAYS_IN_SEC = 2592000 * 1000;
const TWO_HOURS_IN_SEC = 7200 * 1000;
const urlApi = config.api.url;

// --- Controllers ---

const signIn = async (req, res, next) => {
  const { rememberMe } = req.body;
  console.log(req.cookies);
  passport.authenticate('basic', (error, data) => {
    try {
      if (error || !data) next(boom.unauthorized());

      req.login(data, { session: false }, (error) => {
        if (error) next(error);

        const { token, ...user } = data;
        const maxAgeCookie = rememberMe
          ? THIRTY_DAYS_IN_SEC
          : TWO_HOURS_IN_SEC;

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
    const { status } = await axios({
      url: `${urlApi}/api/auth/sign-up`,
      method: 'POST',
      data: userData,
    });

    if (status !== 201) next(boom.badRequest());

    res.status(201).json({ message: 'user created' });
  } catch (error) {
    next(error);
  }
};

const getMovies = async (req, res, next) => { };

const addUserMovie = async (req, res, next) => {
  const { body: userMovie } = req;
  const { token } = { ...req.cookies };
  console.log({ ...req.cookies })
  try {
    const { data, status } = await axios({
      url: `${urlApi}/api/user-movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST',
      data: userMovie,
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
      method: 'DELETE'
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
  getMovies,
  addUserMovie,
  deletUserMovie,
};
