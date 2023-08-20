const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { HttpError } = require('../utils');

const { ACCESS_SECRET_KEY } = process.env;

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (typeof authHeader !== 'string') {
    throw HttpError(401);
  }

  const [bearer, token] = authHeader.split(' ', 2);

  if (!token || bearer !== 'Bearer') {
    throw HttpError(401);
  }

  jwt.verify(token, ACCESS_SECRET_KEY, async (err, decode) => {
    if (err) {
      return next(HttpError(401));
    }

    try {
      const user = await User.findOne({ token });

      if (!user || !user.token || user.token !== token) {
        throw HttpError(401);
      }

      req.user = user;
      next();
    } catch (error) {
      next(HttpError(401));
    }
  });
};

module.exports = authenticate;
