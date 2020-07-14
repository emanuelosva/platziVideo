/**
 * @fileoverview Movies router
*/

const { Router } = require('express');
const { successResponse } = require('../network/response');
const { moviesMock } = require('../utils/mocks/movies');

// --- Roter function injection ---
const moviesRouter = (app) => {
  // Router injection (util for test)
  const router = Router();
  app.use('/api/movies', router);

  // Routes definition
  router.get('/', listMovies);
  router.get('/:movieId', getMovie);
  router.post('/', addMovie);
  router.put('/:movieId', updateMovie);
  router.delete('/:movieId', deleteMovie);
};

// --- Rotes Callbacks ---

// (GET) List all movies or filter by tag in query
const listMovies = async (req, res, next) => {
  try {
    // const { query } = req;
    const movies = await Promise.resolve(moviesMock);
    successResponse(req, res, movies, 200, 'Movies listed');
  } catch (error) {
    next(error);
  }
};

// (GET) Get movie by id
const getMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Promise.resolve(moviesMock);
    successResponse(req, res, movie[0], 200, `Movie retrieved. ID: ${movieId}`);
  } catch (error) {
    next(error);
  }
};

// (POST) Add new Movie
const addMovie = async (req, res, next) => {
  try {
    const [movie] = await Promise.resolve(moviesMock);
    successResponse(req, res, movie, 201, `Movie created. ID: ${movie._id}`);
  } catch (error) {
    next(error);
  }
};

// (PATCH) Add new Movie
const updateMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    // const data = { ...req.body };
    const movies = await Promise.resolve(moviesMock);
    successResponse(req, res, movies[0], 200, `Movie updated. ID: ${movieId}`);
  } catch (error) {
    next(error);
  }
};

// (DELTE) Add new Movie
const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movies = await Promise.resolve(moviesMock);
    successResponse(req, res, movies[0], 200, `Movie deleted. ID: ${movieId}`);
  } catch (error) {
    next(error);
  }
};

module.exports = moviesRouter;
