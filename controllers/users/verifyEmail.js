const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError } = require('../../utils');
const { SECRET_KEY } = process.env;

const verifyEmail = ctrlWrapper(async (req, res) => {
  const { verificationCode } = req.body;

  const user = await User.findOne({ verificationCode });
  if (!user) throw HttpError(401);
  if (user.verifiedEmail) throw HttpError(400, 'Email already verified');
  if (user.verificationCode !== verificationCode) throw HttpError(401);
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  const newUser = await User.findByIdAndUpdate(
    user._id,
    { verifiedEmail: true, verificationCode: null, token },
    { new: true }
  );
  if (!newUser) throw HttpError(404);

  res.status(200).json({
    message: `Email ${user.email} verified successfully.`,
    token,
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

module.exports = verifyEmail;
