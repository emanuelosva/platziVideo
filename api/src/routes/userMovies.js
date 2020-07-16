/**
 * @fileoverview Movies router
*/

const { Router } = require('express');
const { successResponse } = require('../network/response');
const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../network/middleware/validationHandler');
const {
  userMovieIdSchema,
  createUserMovieSchema,
} = require('../schemas/userMovies');
const { userIdSchema } = require('../schemas/users')


// --- Roter function injection ---

const userMoviesRouter = (app) => {
  const router = Router();
  app.use('/api/user-movies', router);

  // Routes definition
  router.get('/',
    validationHandler({ userId: userIdSchema }, 'query'),
    getUserMovies,
  );
  router.post('/',
    validationHandler(createUserMovieSchema),
    createUserMovie,
  );
  router.delete('/:userMovieId',
    validationHandler({ userMovieId: userMovieIdSchema }, 'params'),
    deleteUserMovie
  )
};

// --- Rotes Callbacks ---
const userMoviesService = new UserMoviesService();

/**
 * (GET) Get all user movies
*/
const getUserMovies = async (req, res, next) => {
  const { userId } = req.query;
  try {
    const movies = await userMoviesService
      .getUserMovies({ userId });
    successResponse(req, res, movies, 200, 'User movies listed');
  } catch (error) {
    next(error);
  }
};

/**
 * (POST) Add a movie to user list
*/
const createUserMovie = async (req, res, next) => {
  const { body: userMovie } = req;
  try {
    const userMovieCreated = await userMoviesService
      .createUserMovie({ userMovie });
    successResponse(req, res, userMovieCreated, 201, 'User movie created');
  } catch (error) {
    next(error);
  }
};

/**
 * (DELETE) Delete a movie from user list
*/
const deleteUserMovie = async (req, res, next) => {
  const { userMovieId } = req.params;
  try {
    const userMovieDeleted = await userMoviesService
      .deleteUserMovie({ userMovieId });
    successResponse(req, res, userMovieDeleted, 200, 'User movie deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = userMoviesRouter;

