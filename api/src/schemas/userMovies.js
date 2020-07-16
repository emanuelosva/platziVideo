/**
 * Validation Schema by Joi for users movies
*/

const Joi = require('@hapi/joi');
const { movieIdSchema } = require('./movies');
const { userIdSchema } = require('./users');

// --- Schemas ---

const userMovieIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);


// --- Object Schemas ---

const createUserMovieSchema = {
  userId: userIdSchema,
  movieId: movieIdSchema,
};

module.exports = {
  userMovieIdSchema,
  createUserMovieSchema,
};
