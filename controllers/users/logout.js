const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');

const logout = ctrlWrapper(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { accessToken: null, refreshToken: null });
  res.status(200).json({ message: 'Logged out' });
});

module.exports = logout;
