const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError, sendEmail, createMsg, cutUUID } = require('../../utils');

const register = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (await User.findOne({ email })) throw HttpError(409);

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationCode = cutUUID(crypto.randomUUID());
  const msg = createMsg.verifyEmail(email, verificationCode);
  await sendEmail.nodemailer(msg);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationCode,
  });
  if (!newUser) throw HttpError(500, 'Failed to register.');

  res.status(201).json({ message: 'Registred.' });
});
module.exports = register;
