const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError } = require('../../utils');

const verifyEmail = ctrlWrapper(async (req, res) => {
  const { email, verificationCode } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw HttpError(401);
  if (user.verifiedEmail) throw HttpError(400, 'Email already verified');
  if (user.verificationCode !== verificationCode) throw HttpError(401);

  const newUser = await User.findByIdAndUpdate(
    user._id,
    { verifiedEmail: true, verificationCode: null },
    { new: true }
  );
  if (!newUser) throw HttpError(404);

  res.status(200).json({ message: `Email ${email} verified successfully.` });
});

module.exports = verifyEmail;
