const crypto = require('crypto');

const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError, sendEmail } = require('../../utils');

const sendVerificationEmail = ctrlWrapper(async (req, res) => {
  const { email } = req.body;
  const { user } = req;
  const verificationCode = crypto.randomUUID();

  if (!user.verificationCode) {
    await sendEmail(email, verificationCode);
    const newUser = await User.findByIdAndUpdate(user._id, {
      verificationCode: `${email} ${verificationCode}`,
    });
    if (!newUser) throw HttpError(404);
    res.json({ message: `Email sent to ${email}` });
  } else {
    throw HttpError(409, `Email already verified!`);
  }
});

module.exports = sendVerificationEmail;
