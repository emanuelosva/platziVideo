/**
 * @fileoverview Scope handlers middleware
*/

const boom = require('@hapi/boom');

const scopeValidationHandler = (allowedScopes) => {
  return (req, res, next) => {
    if (!req.user || (req.user && !req.user.scopes)) {
      next(boom.unauthorized('Missing scopes'));
    }

    const hasAcces = allowedScopes
      .map((allowedScope) => req.user.scopes.includes(allowedScope))
      .find((allowed) => Boolean(allowed));

    if (!hasAcces) next(boom.unauthorized('Insufficient scopes'));
    next();
  };
};

module.exports = scopeValidationHandler;
