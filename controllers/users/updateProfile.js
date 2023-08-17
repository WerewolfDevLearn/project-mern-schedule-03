const bcrypt = require('bcryptjs');

const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { cloudinary, HttpError } = require('../../utils');

const updateProfile = ctrlWrapper(async (req, res) => {
  // const { name, email, password, phone, birthday, skype, verificationCode } = req.body;
  const { name, email, phone, birthday, skype } = req.body;
  console.log('req.body: ', req.body);

  // let avatarUrl = req.user.avatarUrl;
  const existingUser = req.user;

  // Update avatar
  if (req.file) {
    console.log(req.file);
    const { avatarId } = req.user;
    if (avatarId) await cloudinary.destroy(avatarId);
    // eslint-disable-next-line camelcase
    const { url, public_id } = await cloudinary.upload(req.file.path);
    // avatarUrl = url;

    // const avatar = { avatarUrl: url, avatarId: public_id };
    existingUser.avatarUrl = url;
    existingUser.avatarId = public_id;
    // const newUser = await User.findByIdAndUpdate(req.user._id, avatar);
    // if (!newUser) throw HttpError(404);
  }
  // Update password
  // if (password) {
  //   const hashPassword = await bcrypt.hash(password, 10);
  //   const newUser = await User.findByIdAndUpdate(req.user._id, { password: hashPassword });
  //   if (!newUser) throw HttpError(404);
  // }
  // Update email
  // if (req.user.verificationCode) {
  //   const [newEmail, code] = req.user.verificationCode.split(' ');
  //   if (newEmail === email && verificationCode === code) {
  //     const newUser = await User.findByIdAndUpdate(req.user._id, { email, verificationCode: null });
  //     if (!newUser) throw HttpError(404);
  //   }
  // }
  // update email.light
  if (email && email !== existingUser.email) {
    existingUser.email = email;
  }
  if (name && name !== existingUser.name) {
    existingUser.name = name;
  }
  if (phone && phone !== existingUser.phone) {
    existingUser.phone = phone;
  }
  if (birthday && birthday !== existingUser.birthday) {
    existingUser.birthday = birthday;
  }
  if (skype && skype !== existingUser.skype) {
    existingUser.skype = skype;
  }

  const newUser = await User.findByIdAndUpdate(
    existingUser._id,
    { ...existingUser },
    { new: true }
  );
  if (!newUser) throw HttpError(404);
  res.status(200).json({
    message: `Profile updated successfully.`,
    token: newUser.token,
    user: {
      skype: newUser.skype,
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

module.exports = updateProfile;
