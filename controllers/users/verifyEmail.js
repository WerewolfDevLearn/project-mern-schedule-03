const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError } = require('../../utils');
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const verifyEmail = ctrlWrapper(async (req, res) => {
  const { verificationCode } = req.body;
  // Find user
  const userArr = await User.find({
    verificationCode: { $regex: `${verificationCode}`, $options: 'i' },
  });
  const user = userArr[0];
  if (!user) {
    throw HttpError(401, 'Action Required: Verify Your Email');
  }
  // Check verification code
  const [code, newEmail] = user.verificationCode.split(' ');
  if (code !== verificationCode) {
    throw HttpError(401, 'Action Required: Verify Your Email');
  }
  // Define mail change or new one
  if (newEmail) {
    await User.findByIdAndUpdate(user._id, { email: newEmail });
  }
  // Allow access
  const payload = { id: user._id };
  const token = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '5h' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' });

  const newUser = await User.findByIdAndUpdate(
    user._id,
    { verifiedEmail: true, verificationCode: null, token, refreshToken },
    { new: true }
  );
  if (!newUser) throw HttpError(500, 'Failed to verify email.');

  res
    .status(200)
    .json({ message: `Email ${newUser.email} verified successfully.`, token, refreshToken });
});

module.exports = verifyEmail;
