const { ctrlWrapper } = require('../../decorators');

const getCurrent = ctrlWrapper(async (req, res) => {
  const { name, email, _id, verifiedEmail, token } = req.user;
  const { phone, birthday, skype, avatarUrl, refreshToken } = req.user;

  res.status(200).json({
    token,
    refreshToken,
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
