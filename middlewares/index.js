const isValidId = require('./isValidId');
const globalErrorHandler = require('./globalErrorHandler');
const missingRouteHandler = require('./missingRouteHandler');
const authenticate = require('./authenticate');
const upload = require('./upload');
const passport = require('./passport');

module.exports = {
  isValidId,
  globalErrorHandler,
  missingRouteHandler,
  authenticate,
  upload,
  passport,
};
