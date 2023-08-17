const bcrypt = require('bcryptjs');

const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError } = require('../../utils');

const updatePassword = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) throw HttpError(401);

  const { password } = req.body;

  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw HttpError(401);
  }

  res.status(200).json({ message: 'Password updated successfully.' });
});

module.exports = updatePassword;
