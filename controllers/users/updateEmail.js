const crypto = require('crypto');

const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError, sendEmail, createMsg, cutUUID } = require('../../utils');

const updateEmail = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;
  const { email } = req.body;

  const user = await User.findById(_id);
  if (!user) throw HttpError(422);

  const verificationCode = cutUUID(crypto.randomUUID());
  const msg = createMsg.verifyEmail(email, verificationCode);
  await sendEmail.nodemailer(msg);

  const newUser = await User.findByIdAndUpdate(_id, {
    verificationCode: `${verificationCode} ${email}`,
  });
  if (!newUser) throw HttpError(500, 'Failed to update email.');

  res.status(200).json({ message: `Action Required: Verify ${email}` });
});

module.exports = updateEmail;
