const User = require('../../models/User');
const { ctrlWrapper } = require('../../decorators');
const { HttpError, sendEmail } = require('../../utils');

const verifyEmail = ctrlWrapper(async (req, res) => {
  const { email, verificationCode } = req.body;
  console.log(verificationCode);
  console.log(email);

  const user = await User.findOne({ email });
  if (!user) throw new HttpError(401);
  if (user.verifiedEmail) throw new HttpError(400, 'Email already verified');
  if (user.verificationCode !== verificationCode) throw new HttpError(401);

  const newUser = await User.findByIdAndUpdate(
    user._id,
    { verifiedEmail: true, verificationCode: null },
    { new: true }
  );
  if (!newUser) throw new HttpError(404);

  res.status(200).json({ message: `Email ${email} verified successfully.` });
});

const resendEmail = ctrlWrapper(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, 'Email not found');
  if (user.verifiedEmail) throw HttpError(400, 'Email already verified');
  await sendEmail(email, user.verificationCode);
  res.json({ message: `Email sent to ${email}` });
});

module.exports = { verifyEmail, resendEmail };
