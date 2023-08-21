const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError, sendEmail, createMsg } = require('../../utils');
const { BASE_URL, ACCESS_SECRET_KEY } = process.env;

const forgotPassword = ctrlWrapper(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw HttpError(422);

  const payload = { id: user._id };
  const secret = ACCESS_SECRET_KEY + user.password;
  const pwdToken = jwt.sign(payload, secret, { expiresIn: '10m' });

  const link = `${BASE_URL}/api/users/reset/${user._id}/${pwdToken}`;
  const msg = createMsg.forgotPassword(email, link);
  await sendEmail.nodemailer(msg);

  res.status(200).json({ message: `Email to ${user.email} sent.` });
});

module.exports = forgotPassword;
