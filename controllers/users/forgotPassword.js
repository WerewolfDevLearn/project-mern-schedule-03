const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError, sendEmail, createMsg } = require('../../utils');
const { BASE_URL, ACCESS_SECRET_KEY } = process.env;

const forgotPassword = ctrlWrapper(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw HttpError(422);

  const payload = { email: user.email, id: user._id };
  const sectret = ACCESS_SECRET_KEY + user.password;
  const token = jwt.sign(payload, sectret, { expiresIn: '10m' });

  const link = `${BASE_URL}/reset/${user._id}/${token}`;

  // Send link via email

  res.status(200).json({ message: 'Email sent', link });
});

module.exports = forgotPassword;
