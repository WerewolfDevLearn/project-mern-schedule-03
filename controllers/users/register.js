const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const crypto = require('crypto');

const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError, sendEmail } = require('../../utils');

const register = ctrlWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  if (await User.findOne({ name })) throw HttpError(409);
  if (await User.findOne({ email })) throw HttpError(409);

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const verificationCode = crypto.randomUUID();

  await sendEmail(email, verificationCode);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
    verificationCode,
  });
  res.status(201).json(newUser);
});

module.exports = register;
