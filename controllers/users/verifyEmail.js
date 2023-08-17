const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError } = require('../../utils');
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const verifyEmail = ctrlWrapper(async (req, res) => {
  const { verificationCode } = req.body;

  const user = await User.findOne({ verificationCode });
  if (!user) throw HttpError(401, 'Action Required: Verify Your Email');
  if (user.verifiedEmail) {
    throw HttpError(400, 'Email already verified');
  }
  if (user.verificationCode !== verificationCode) {
    throw HttpError(401, 'Action Required: Verify Your Email');
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '10h' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' });
  const newUser = await User.findByIdAndUpdate(
    user._id,
    { verifiedEmail: true, verificationCode: null, token, refreshToken },
    { new: true }
  );
  if (!newUser) throw HttpError(404);

  res.status(200).json({
    message: `Email ${user.email} verified successfully.`,
    token,
    refreshToken,
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      skype: newUser.skype,
      birthday: newUser.birthday,
      avatarUrl: newUser.avatarUrl,
      verifiedEmail: newUser.verifiedEmail,
    },
  });
});

module.exports = verifyEmail;
