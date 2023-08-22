const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError } = require('../../utils');
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const refresh = ctrlWrapper(async (req, res, next) => {
  // req.body do not attach refreshToken sometimes !!!  console.log('req.body: ', req.body.refreshToken);  console.log('req.headers: ', req.headers.refreshtoken);
  const token = req.headers.refreshtoken;

  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
    const user = await User.findOne({ refreshToken: token });

    if (!user || !user.refreshToken || user.refreshToken !== token) {
      next(HttpError(403));
    }
    const accessToken = jwt.sign({ id }, ACCESS_SECRET_KEY, { expiresIn: '5h' });
    const refreshToken = jwt.sign({ id }, REFRESH_SECRET_KEY, { expiresIn: '7d' });
    const newUser = await User.findByIdAndUpdate(
      user._id,
      { token: accessToken, refreshToken },
      { new: true }
    );
    if (!newUser) throw HttpError(500, 'Please log in.');

    res.status(200).json({ token: accessToken, refreshToken });
  } catch {
    next(HttpError(403));
  }
});

module.exports = refresh;
