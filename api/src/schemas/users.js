/**
 * Validation Schema by Joi for Users
*/

const Joi = require('@hapi/joi');

// --- Schemas ---

const userIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userNameSchema = Joi.string().max(100);
const userEmailSchema = Joi.string().email();
const userPasswordSchema = Joi.string().min(6);

// --- Object Schemas ---

const createUserSchema = {
  name: userNameSchema.required(),
  email: userEmailSchema.required(),
  password: userPasswordSchema.required(),
  isAdmin: Joi.boolean(),
};

const updateUserSchema = {
  name: userNameSchema,
  email: userEmailSchema,
  password: userPasswordSchema,
  isAdmin: Joi.boolean(),
};

module.exports = {
  userIdSchema,
  userEmailSchema,
  createUserSchema,
  updateUserSchema,
};
