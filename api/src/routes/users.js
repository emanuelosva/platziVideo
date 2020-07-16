/**
 * @fileoverview Movies router
*/

const { Router } = require('express');
const { successResponse } = require('../network/response');
const UsersService = require('../services/users');
const validationHandler = require('../network/middleware/validationHandler');
const cacheResponse = require('../network/cacheResponse');
const {
  FIVE_MINUTES_INSECODS,
} = require('../utils/time');
const {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
  userEmailSchema
} = require('../schemas/users');

// --- Roter function injection ---

const usersRouter = (app) => {
  const router = Router();
  app.use('/api/users', router);

  // Routes definition
  router.get('/',
    validationHandler({ email: userEmailSchema }, 'query'),
    getUser,
  );
  router.post('/',
    validationHandler(createUserSchema),
    createUser,
  );
  router.put('/:userId',
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
 * (POST) Create a user
*/
const createUser = async (req, res, next) => {
  const { body: userData } = req;
  try {
    const user = await usersService.createUser({ userData });
    successResponse(req, res, user, 201, 'User created');
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
