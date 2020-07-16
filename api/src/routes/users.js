/**
 * @fileoverview Movies router
*/

const { Router } = require('express');
const { successResponse } = require('../network/response');
const UsersService = require('../services/users');
const validationHandler = require('../network/middleware/validationHandler');
const cacheResponse = require('../network/cacheResponse');
const scopeValidationHandler = require('../network/middleware/scopesValidationHandler');
const { jwtAuth } = require('../network/middleware/auth');
const {
  FIVE_MINUTES_INSECODS,
} = require('../utils/time');
const {
  userIdSchema,
  updateUserSchema,
  userEmailSchema
} = require('../schemas/users');

// --- Roter function injection ---

const usersRouter = (app) => {
  const router = Router();
  router.use(jwtAuth);
  app.use('/api/users', router);

  // Routes definition
  router.get('/',
    scopeValidationHandler(['read:movies']),
    validationHandler({ email: userEmailSchema }, 'query'),
    getUser,
  );
  router.put('/:userId',
    scopeValidationHandler(['signin:auth']),
    validationHandler({ userId: userIdSchema }, 'params'),
    validationHandler(updateUserSchema),
    updateUser,
  );
};

// --- Rotes Callbacks ---
const usersService = new UsersService();

/**
 * (GET) Get a user
*/
const getUser = async (req, res, next) => {
  cacheResponse(res, FIVE_MINUTES_INSECODS);
  const { email } = req.query;
  try {
    const user = await usersService.getUser({ email });
    successResponse(req, res, user, 200, 'User retrieved');
  } catch (error) {
    next(error);
  }
};

/**
 * (PUT) Update a user
*/
const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { body: userData } = req;
  try {
    const user = await usersService.updateUser({ userId, userData });
    successResponse(req, res, user, 200, 'User updated');
  } catch (error) {
    next(error);
  }
};

module.exports = usersRouter;
