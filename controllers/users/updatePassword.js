const bcrypt = require('bcryptjs');

const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError } = require('../../utils');

const updatePassword = ctrlWrapper(async (req, res) => {
  const { password, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) throw HttpError(400);
  const isMatch = await bcrypt.compare(password, req.user.password);

  if (!isMatch) {
    throw HttpError(401);
  }
  const hashPassword = await bcrypt.hash(newPassword, 10);
  const newUser = await User.findByIdAndUpdate(req.user._id, { password: hashPassword });
  if (!newUser) throw HttpError(404);

  res.status(200).json({ message: 'Password updated.' });
});

module.exports = updatePassword;
