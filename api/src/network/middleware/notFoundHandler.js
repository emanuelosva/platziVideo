/**
 * @fileoverview NotFound (404) handler
*/

const boom = require('@hapi/boom');
const { errorResponse } = require('../response');

const notFountHandler = (req, res) => {
  const { output: { statusCode }, message } = boom.notFound();
  errorResponse(req, res, message, statusCode);
};

module.exports = notFountHandler;
