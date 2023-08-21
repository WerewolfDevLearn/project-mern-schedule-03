const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError } = require('../../utils');

const logout = ctrlWrapper(async (req, res) => {
  const newUser = await User.findByIdAndUpdate(req.user._id, { token: null, refreshToken: null });
  if (!newUser) throw HttpError(500, 'Failed to log out.');

  res.status(200).json({ message: 'Logged out.' });
});

module.exports = logout;
