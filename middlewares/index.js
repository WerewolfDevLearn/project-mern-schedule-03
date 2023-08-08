const isValidId = require('./isValidId');
const globalErrorHandler = require('./globalErrorHandler');
const missingRouteHandler = require('./missingRouteHandler');
const authenticate = require('./authenticate');
const upload = require('./upload');

module.exports = {
  isValidId,
  globalErrorHandler,
  missingRouteHandler,
  authenticate,
  upload,
};
