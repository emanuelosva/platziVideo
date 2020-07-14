/**
 * @fileoverview Movies router
*/

const { Router } = require('express');
const { successResponse } = require('../network/response');
const MoviesService = require('../services/movies');

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
  router.patch('/:movieId', updateMoviePartially)
  router.delete('/:movieId', deleteMovie);
};

// --- Rotes Callbacks ---
const moviesService = new MoviesService();

// (GET) List all movies or filter by tag in query
const listMovies = async (req, res, next) => {
  try {
    const { tags } = req.query;
    const movies = await moviesService.getMovies({ tags });
    successResponse(req, res, movies, 200, 'Movies listed');
  } catch (error) {
    next(error);
  }
};

// (GET) Get movie by id
const getMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await moviesService.getMovie({ movieId });
    successResponse(req, res, movie, 200, `Movie retrieved. ID: ${movie._id}`);
  } catch (error) {
    next(error);
  }
};

// (POST) Add new Movie
const addMovie = async (req, res, next) => {
  try {
    const { body: movieData } = req;
    const movie = await moviesService.createMovie({ movieData });
    successResponse(req, res, movie, 201, `Movie created. ID: ${movie._id}`);
  } catch (error) {
    next(error);
  }
};

// (PUT) Update a Movie
const updateMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { body: movieData } = req;
    const movie = await moviesService.updateMovie({ movieId, movieData });
    successResponse(req, res, movie, 200, `Movie updated. ID: ${movie._id}`);
  } catch (error) {
    next(error);
  }
};

// (PATCH) Update partially a Movie
const updateMoviePartially = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { body: movieData } = req;
    const movie = await moviesService.updateMovie({ movieId, movieData });
    successResponse(req, res, movie, 200, `Movie updated. ID: ${movie._id}`);
  } catch (error) {
    next(error);
  }
};

// (DELTE) Delete a Movie
const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await moviesService.deleteMovie({ movieId });
    successResponse(req, res, movie, 200, `Movie deleted. ID: ${movie._id}`);
  } catch (error) {
    next(error);
  }
};

module.exports = moviesRouter;
