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

const succesResponse = (req, res, data, status, message) => {
  let statusCode = status || res.statusCode || 200;
  let statusMessages = message || STATUS_MESSAGES[statusCode] || res.statusMessage;

  res.status(statusCode).json({
    error: false,
    status: statusCode,
    message: statusMessages,
    body: data,
  });
};

const errorResponse = (req, res, data, status, error) => {
  let statusCode = status || res.statusCode || 500;
  let statusMessages = STATUS_MESSAGES[statusCode] || res.statusMessage;

  console.error(error);

  res.status(statusCode).json({
    error: false,
    status: statusCode,
    message: statusMessages,
    body: data,
  });
};

module.exports = {
  succesResponse,
  errorResponse,
};
