const { ctrlWrapper } = require('../../decorators');

const getCurrent = ctrlWrapper(async (req, res) => {
  const { name, email, phone, birthday, skype, avatarUrl, _id, verifiedEmail } = req.user;
  res.status(200).json({
    user: {
      name,
      email,
      phone,
      birthday,
      avatarUrl,
      _id,
      verifiedEmail,
      skype,
    },
  });
});

module.exports = getCurrent;
