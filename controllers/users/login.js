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
    throw HttpError(401, `Email not verified, check ${email}!`);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw HttpError(401);
  const payload = { id: user._id };
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '10m' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '1d' });
  const returntUser = await User.findByIdAndUpdate(
    user._id,
    { accessToken, refreshToken },
    { new: true }
  );
  res.status(200).json({
    accessToken,
    refreshToken,
    user: {
      name: returntUser.name,
      email: returntUser.email,
      phone: returntUser.phone,
      birthday: returntUser.birthday,
      avatarUrl: returntUser.avatarUrl,
      _id: returntUser._id,
      verifiedEmail: returntUser.verifiedEmail,
    },
  });
});

module.exports = login;
