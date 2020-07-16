/**
 * @fileoverview Movies router
*/

const { Router } = require('express');
const { successResponse } = require('../network/response');
const MoviesService = require('../services/movies');
const validationHandler = require('../network/middleware/validationHandler');
const cacheResponse = require('../network/cacheResponse');
const { jwtAuth } = require('../network/middleware/auth');
const {
  FIVE_MINUTES_INSECODS,
  SIXTY_MINUTES_INSEONDS,
} = require('../utils/time');
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require('../schemas/movies');

// --- Roter function injection ---

const moviesRouter = (app) => {
  // Router injection (util for test)
  const router = Router();
  router.use(jwtAuth)
  app.use('/api/movies', router);

  // Routes definition
  router.get('/',
    listMovies
  );
  router.get('/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    getMovie
  );
  router.post('/',
    validationHandler(createMovieSchema),
    addMovie
  );
  router.put('/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    updateMovie
  );
  router.patch('/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    updateMoviePartially
  );
  router.delete('/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    deleteMovie
  );
};

// --- Rotes Callbacks ---
const moviesService = new MoviesService();

/**
 * (GET) Get all movis
*/
const listMovies = async (req, res, next) => {
  cacheResponse(res, FIVE_MINUTES_INSECODS);
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
  cacheResponse(res, SIXTY_MINUTES_INSEONDS);
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
