/**
 * @fileoverview Auth router
*/

const { Router } = require('express');
const { login } = require('../services/auth');

// --- Roter function injection ---
const authApiRouter = (app) => {
  const router = Router();
  app.use(router);

  // Routes definition
  router.post('/api/auth/sign-in', signIn)
};

// --- Rotes Callbacks ---

/**
 * (POST) Sign In
*/
const signIn = async (req, res, next) => {
  const { apiKeyToken } = req.body;
  login(req, res, next, apiKeyToken);
};

module.exports = authApiRouter;
