/* eslint-disable no-unused-vars */
/**
 * @fileoverview Error handlers middleware
*/

const config = require('../../../config');
const { errorResponse } = require('../response');

// Utils
const withErrorStack = (error, stack) => {
  if (config.dev) return { error, stack };

  return error;
};

// Middleares
const logErrors = (err, req, res, next) => {
  console.log(err);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const error = withErrorStack(err.message || err, err.stack)
  errorResponse(req, res, error, err.status || 500);
};

module.exports = {
  logErrors,
  errorHandler,
};
