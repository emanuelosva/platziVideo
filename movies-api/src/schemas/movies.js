/**
 * Validation Schema by Joi for Movies
*/

const Joi = require('@hapi/joi');

// --- Schemas ---

const movieIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const movieTitleSchema = Joi.string().max(80);
const movieYearSchema = Joi.number().min(1888).max(2077);
const movieCoverSchema = Joi.string().uri();
const movieDescriptionSchema = Joi.string().min(10).max(500);
const movieDuartionSchema = Joi.number().min(1).max(500);
const movieContentRatingSchema = Joi.string().max(5);
const movieSourceSchema = Joi.string().uri();
const movieTagsSchema = Joi.array().items(Joi.string().max(50));

// --- Object Schemas ---

const createMovieSchema = {
  title: movieTitleSchema.required(),
  year: movieYearSchema.required(),
  cover: movieCoverSchema.required(),
  description: movieDescriptionSchema.required(),
  duration: movieDuartionSchema.required(),
  contentRating: movieContentRatingSchema.required(),
  source: movieSourceSchema.required(),
  tags: movieTagsSchema,
};

const updateMovieSchema = {
  title: movieTitleSchema,
  year: movieYearSchema,
  cover: movieCoverSchema,
  description: movieDescriptionSchema,
  duration: movieDuartionSchema,
  contentRating: movieContentRatingSchema,
  source: movieSourceSchema,
  tags: movieTagsSchema,
};

module.exports = {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
};
