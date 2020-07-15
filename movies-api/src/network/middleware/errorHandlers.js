/* eslint-disable no-unused-vars */
/**
 * @fileoverview Error handlers middleware
*/

const debug = require('debug')('app:error');
const boom = require('@hapi/boom');
const config = require('../../../config');
const { errorResponse } = require('../response');

// Utils
const withErrorStack = (error, stack) => {
  if (config.dev) return { error, stack };
  return error;
};

// Middleares
const logErrors = (err, req, res, next) => {
  debug(err);
  next(err);
};

const wrapErrors = (err, req, res, next) => {
  // For personalized errors (it does not have [message])

  if (!err.message || err.isBoom) {
    next(err)
  }

  next(boom.badImplementation(err));
};

const errorHandler = (err, req, res, next) => {
  // Only personalized errors are not boom

  if (!err.isBoom) {
    const error = withErrorStack(err, err.stack);
    errorResponse(req, res, error, err.status || 500);
  } else {
    const { output: { statusCode, payload } } = err;
    const error = withErrorStack(payload.message, err.stack);
    errorResponse(req, res, error, statusCode || 500);
  }
};

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};
