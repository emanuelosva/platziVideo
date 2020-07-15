/**
 * Validation Schema by Joi for Users
*/

const Joi = require('@hapi/joi');

// --- Schemas ---

const userIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

// --- Object Schemas ---

const createUserSchema = {
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  isAdmin: Joi.boolean(),
};

module.exports = {
  userIdSchema,
  createUserSchema,
};
