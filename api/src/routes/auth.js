/**
 * @fileoverview Auth router
*/

const { Router } = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const { successResponse } = require('../network/response');
const ApiKeysService = require('../services/apiKeys');
const config = require('../../config');

// Basic Strategy
require('../lib/auth/strategys/basic');


// --- Roter function injection ---

const authApiRouter = (app) => {
  const router = Router();
  app.use(router);

  // Routes definition
  router.post('/api/auth/sign-in', signIn)
};

// --- Rotes Callbacks ---
const apiKeyService = new ApiKeysService();

/**
 * (POST) Sign In
*/
const signIn = async (req, res, next) => {
  const { apiKeyToken } = req.body;
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

};

module.exports = authApiRouter;
