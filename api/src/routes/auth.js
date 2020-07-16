/**
 * @fileoverview Auth router
*/

const { Router } = require('express');
const Auth = require('../services/auth');
const validationHandler = require('../network/middleware/validationHandler');
const { createUserSchema } = require('../schemas/users');


// --- Roter function injection ---
const authApiRouter = (app) => {
  const router = Router();
  app.use('/api/auth', router);

  // Routes definition
  router.post('/sign-in', signIn);
  router.post('/sign-up',
    validationHandler(createUserSchema),
    singUp
  );
};

// --- Rotes Callbacks ---

const auth = new Auth();

/**
 * (POST) Sign In
*/
const signIn = async (req, res, next) => {
  const { apiKeyToken } = req.body;
  try {
    await auth.login(req, res, next, apiKeyToken);
  } catch (error) {
    next(error);
  }
};

/**
 * (POST) Sign Up
*/
const singUp = async (req, res, next) => {
  const { body: userData } = req;
  try {
    await auth.singUp(req, res, next, userData);
  } catch (error) {
    next(error);
  }
};

module.exports = authApiRouter;
