/**
 * @fileoverview Error handlers middleware
*/

const passport = require('passport');
const boom = require('@hapi/boom');

// JWT auth strategy
require('../../lib/auth/strategys/jwt');

const jwtAuth = (req, res, next) => {
  passport.authenticate(
    'jwt',
    (error, user) => {
      if (!user || error) return next(boom.unauthorized());

      req.login(user, { session: false }, (error) => {
        if (error) return next(boom.unauthorized());
        next();
      })
    })(req, res, next);
};

module.exports = {
  jwtAuth,
};

