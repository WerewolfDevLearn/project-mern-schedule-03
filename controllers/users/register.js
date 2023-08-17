const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError, sendEmail } = require('../../utils');

const register = ctrlWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  if (await User.findOne({ name })) throw HttpError(409);
  if (await User.findOne({ email })) throw HttpError(409);

  const hashPassword = await bcrypt.hash(password, 10);

  const verificationCode = crypto.randomUUID();
  await sendEmail(email, verificationCode);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationCode,
  });
  if (!newUser) throw HttpError(404);

  const { _id, phone, skype, birthday, verifiedEmail } = newUser;
  const profileData = { _id, name, email, birthday, phone, skype, verifiedEmail };

  res.status(201).json({ user: { ...profileData } });
});
module.exports = register;
