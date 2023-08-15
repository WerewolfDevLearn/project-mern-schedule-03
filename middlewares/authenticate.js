const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { HttpError } = require('../utils');

const { ACCESS_SECRET_KEY } = process.env;

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (typeof authHeader !== 'string') {
    throw HttpError(401, 'No token provided');
  }

  const [bearer, accessToken] = authHeader.split(' ', 2);

  if (!accessToken || bearer !== 'Bearer') {
    throw HttpError(401, 'User is not authorized');
  }

  jwt.verify(token, SECRET_KEY, async (err, decode) => {
    if (err) return next(err);


    try {
      const user = await User.findOne({ accessToken: accessToken });

      if (!user || !user.accessToken || user.accessToken !== accessToken) {
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
