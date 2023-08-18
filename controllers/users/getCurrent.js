const { ctrlWrapper } = require('../../decorators');

const getCurrent = ctrlWrapper(async (req, res) => {
  const { name, email, phone, birthday, skype, avatarUrl } = req.user;

  res.status(200).json({ user: { name, email, phone, skype, birthday, avatarUrl } });
});

module.exports = getCurrent;
