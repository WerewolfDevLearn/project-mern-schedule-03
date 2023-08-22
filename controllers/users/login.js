const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError, sendEmail, createMsg } = require('../../utils');
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const login = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log('user: ', user);
  if (!user) throw HttpError(422);
  if (!user.verifiedEmail) {
    const msg = createMsg.verifyEmail(email, user.verificationCode);
    console.log('email sent');
    await sendEmail.nodemailer(msg);
    throw HttpError(401, 'Action Required: Verify Your Email');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw HttpError(401);
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '5h' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' });
  const newUser = await User.findByIdAndUpdate(user._id, { token, refreshToken }, { new: true });
  if (!newUser) throw HttpError(500, 'Failed to log in.');

  res.status(200).json({ message: 'Logged in.', token, refreshToken });
});

module.exports = login;
