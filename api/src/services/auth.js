/**
 * @fileoverview Services layer for Auth
*/

const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const { successResponse } = require('../network/response');
const ApiKeysService = require('./apiKeys');
const UsersService = require('./users');
const config = require('../../config');

// Basic Strategy
require('../lib/auth/strategys/basic');

const apiKeyService = new ApiKeysService();
const usersService = new UsersService();

class Auth {
  async login(req, res, next, apiKeyToken) {
    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'));
    }

    passport.authenticate('basic', (error, user) => {
      try {
        if (error || !user) next(boom.unauthorized());

        req.login(user, { session: false }, async (error) => {
          if (error) next(error);

          const apiKey = await apiKeyService.getApiKeys({
            token: apiKeyToken,
          });
          if (!apiKey) next(boom.unauthorized());

          // If all if's are passed user is authenticated
          const { _id: id, name, email } = user;
          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes,
          };

          const token = jwt.sign(payload, config.jwt.secret, {
            expiresIn: '15m',
          });
          const data = { token, user: { id, name, email } };
          return successResponse(req, res, data, 200, 'Login success');
        });
      } catch (error) {
        next(error)
      }
    })(req, res, next);
  }

  async singUp(req, res, next, userData) {
    try {
      const user = await usersService.createUser({ userData })
      successResponse(req, res, user, 201, 'User created');
    } catch (error) {
      next(error);
    }
  };

  async logout() { };
};

module.exports = Auth;
