const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError, sendEmail } = require('../../utils');
const { SECRET_KEY } = process.env;

const login = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401);
  if (!user.verifiedEmail) {
    await sendEmail(email, user.verificationCode);
    throw HttpError(401, `Email not verified, check ${email}!`);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw HttpError(401);
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  const returntUser = await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
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
