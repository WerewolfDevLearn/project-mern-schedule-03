const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const { ctrlWrapper } = require('../../decorators');
const { cloudinary, HttpError } = require('../../utils');

const updateProfile = ctrlWrapper(async (req, res) => {
  const { name, email, password, phone, birthday, skype, verificationCode } = req.body;
  let avatarUrl = req.user.avatarUrl;

  // Update avatar
  if (req.file) {
    const { avatarId } = req.user;
    if (avatarId) await cloudinary.destroy(avatarId);
    const { url, public_id } = await cloudinary.upload(req.file.path);
    avatarUrl = url;

    const avatar = { avatarUrl: url, avatarId: public_id };
    const newUser = await User.findByIdAndUpdate(req.user._id, avatar);
    if (!newUser) throw HttpError(404);
  }
  // Update password
  if (password) {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.findByIdAndUpdate(req.user._id, { password: hashPassword });
    if (!newUser) throw HttpError(404);
  }
  // Update email
  if (req.user.verificationCode) {
    const [newEmail, code] = req.user.verificationCode.split(' ');
    if (newEmail === email && verificationCode === code) {
      console.log('qwe');
      const newUser = await User.findByIdAndUpdate(req.user._id, { email, verificationCode: null });
      if (!newUser) throw HttpError(404);
    }
  }

  const newUser = await User.findByIdAndUpdate(
    req.user._id,
    { name, phone, birthday, skype },
    { new: true }
  );
  if (!newUser) throw HttpError(404);
  res.status(200).json({ name, email, phone, birthday, skype, avatarUrl });
});

module.exports = updateProfile;
