/**
 * @fileoverview Validation handler
*/

const boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

const validate = (data, schema) => {
  const { error } = Joi.object(schema).validate(data);
  return error;
};

// --- Middlewares ---
const validationHandler = (schema, check = 'body') => {
  return (req, res, next) => {
    const error = validate(req[check], schema);
    error
      ? next(boom.badRequest(error))
      : next();
  };
};

module.exports = validationHandler;
