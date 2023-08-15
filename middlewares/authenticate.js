const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { HttpError } = require('../utils');

const { SECRET_KEY } = process.env;

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (typeof authHeader !== 'string') {
    throw HttpError(401, 'No token provided');
  }

  const [bearer, token] = authHeader.split(' ', 2);

  if (!token || bearer !== 'Bearer') {
    throw HttpError(401, 'User is not authorized');
  }

  jwt.verify(token, SECRET_KEY, async (err, decode) => {
    if (err) return next(err);

    try {
      const user = await User.findOne({ token: token });

      if (!user || !user.token || user.token !== token) {
        throw HttpError(401, 'Not authorized');
      }

      req.user = user;
      next();
    } catch (error) {
      next(HttpError(401));
    }
  });
};

module.exports = authenticate;
