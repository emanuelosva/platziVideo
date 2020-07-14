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

/**
 * (GET) Get all movis
*/
const listMovies = async (req, res, next) => {
  try {
    const { tags } = req.query;
    const movies = await moviesService.getMovies({ tags });
    successResponse(req, res, movies, 200, 'Movies listed');
  } catch (error) {
    next(error);
  }
};

/**
 * (GET) Get one movie by Id
*/
const getMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await moviesService.getMovie({ movieId });
    successResponse(req, res, movie, 200, `Movie retrieved`);
  } catch (error) {
    next(error);
  }
};

/**
 * (POST) Add a new movie
*/
const addMovie = async (req, res, next) => {
  try {
    const { body: movieData } = req;
    const movie = await moviesService.createMovie({ movieData });
    successResponse(req, res, movie, 201, `Movie created`);
  } catch (error) {
    next(error);
  }
};

/**
 * (PUT) Update a movie
*/
const updateMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { body: movieData } = req;
    const movie = await moviesService.updateMovie({ movieId, movieData });
    successResponse(req, res, movie, 200, `Movie updated`);
  } catch (error) {
    next(error);
  }
};

/**
 * (PATCH) Update partially one movie
*/
const updateMoviePartially = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { body: movieData } = req;
    const movie = await moviesService.updateMovie({ movieId, movieData });
    successResponse(req, res, movie, 200, `Movie updated`);
  } catch (error) {
    next(error);
  }
};

/**
 * (DELETE) Delete a movie
*/
const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await moviesService.deleteMovie({ movieId });
    successResponse(req, res, movie, 200, `Movie deleted`);
  } catch (error) {
    next(error);
  }
};

module.exports = moviesRouter;
