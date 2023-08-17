const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError, sendEmail } = require('../../utils');
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const login = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  console.log(user);

  if (!user) throw HttpError(401);
  if (!user.verifiedEmail) {
    await sendEmail(email, user.verificationCode);
    throw HttpError(401, 'Action Required: Verify Your Email');
  }
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw HttpError(401);
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '10h' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' });
  const newUser = await User.findByIdAndUpdate(user._id, { token, refreshToken }, { new: true });

  res.status(200).json({
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

module.exports = login;
