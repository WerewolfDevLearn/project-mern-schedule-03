const User = require('../../models/User');
const { ctrlWrapper } = require('../../decorators');
const { HttpError } = require('../../utils');

const updateProfile = ctrlWrapper(async (req, res) => {
  // const { phone = '', birthday = '', skype = '123' } = req.body;
  const newUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
  if (!newUser) throw HttpError(404);
  res.status(200).json({ user: newUser });
});

module.exports = updateProfile;
