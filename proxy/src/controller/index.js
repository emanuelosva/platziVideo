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
const THIRTY_DAYS_IN_SEC = 2592000;
const TWO_HOURS_IN_SEC = 7200;
const urlApi = config.api.url;

// --- Controllers ---

const singIn = async (req, res, next) => {
  const { rememberMe } = req.body;
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
        });

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

const singUp = async (req, res, next) => {
  const { body: userData } = req;
  try {
    await axios({
      url: `${urlApi}/api/auth/sing-up`,
      method: 'POST',
      data: userData,
    });

    if (res.status !== 201) next(boom.badRequest());

    res.status(201).json({ message: 'user created' });
  } catch (error) {
    next(error);
  }
};

const getMovies = async (req, res, next) => { };
const addUserMovie = async (req, res, next) => { };
const deletUserMovie = async (req, res, next) => { };

module.exports = {
  singIn,
  singUp,
  getMovies,
  addUserMovie,
  deletUserMovie,
};
