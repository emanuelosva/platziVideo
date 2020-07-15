/**
 * @fileoverview Response homogenization
*/

const STATUS_MESSAGES = {
  '200': 'ok',
  '201': 'Created',
  '400': 'Invalid Data',
  '401': 'Unauthorized',
  '403': 'Forbiden',
  '404': 'Not Found',
  '500': 'Internal error',
};

const successResponse = (req, res, data, status, message) => {
  let statusCode = status || res.statusCode || 200;
  let statusMessages = message || STATUS_MESSAGES[statusCode] || res.statusMessage;

  res.status(statusCode).json({
    error: false,
    status: statusCode,
    message: statusMessages,
    body: data,
  });
};

const errorResponse = (req, res, error, status) => {
  let statusCode = status || res.statusCode || 500;
  let statusMessages = error || STATUS_MESSAGES[statusCode] || res.statusMessage;

  res.status(statusCode).json({
    error: true,
    status: statusCode,
    message: statusMessages,
    body: {},
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
