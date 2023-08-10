const { ctrlWrapper } = require('../../decorators');

const getCurrent = ctrlWrapper(async (req, res) => {
  const { name, email, phone, birthday, skype, avatarUrl } = req.user;
  res.status(200).json({
    user: {
      name: returntUser.name,
      email: returntUser.email,
      phone: returntUser.phone,
      birthday: returntUser.birthday,
      avatarUrl: returntUser.avatarUrl,
      _id: returntUser._id,
      verifiedEmail: returntUser.verifiedEmail,
    },
  });
});

module.exports = getCurrent;
