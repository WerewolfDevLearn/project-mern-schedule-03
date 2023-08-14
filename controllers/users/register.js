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
  const avatarUrl = '';
  const verificationCode = crypto.randomUUID();

  await sendEmail(email, verificationCode);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
    verificationCode,
  });
  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      birthday: newUser.birthday,
      avatarUrl: newUser.avatarUrl,
      _id: newUser._id,
      verifiedEmail: newUser.verifiedEmail,
    },
  });
});

module.exports = register;
