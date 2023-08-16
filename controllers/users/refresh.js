const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError } = require('../../utils');
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const refresh = ctrlWrapper(async (req, res, next) => {
  const { refreshToken: token } = req.body;

  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
    const user = await User.findOne({ refreshToken: token });

    if (!user || !user.refreshToken || user.refreshToken !== token) {
      next(HttpError(403));
    }

    const accessToken = jwt.sign({ id }, ACCESS_SECRET_KEY, { expiresIn: '10m' });
    const refreshToken = jwt.sign({ id }, REFRESH_SECRET_KEY, { expiresIn: '1d' });
    res.status(200).json({ accessToken, refreshToken });
  } catch {
    next(HttpError(403));
  }
});

module.exports = refresh;
