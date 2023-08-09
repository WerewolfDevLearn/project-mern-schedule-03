const { ctrlWrapper } = require('../../decorators');

const getCurrent = ctrlWrapper(async (req, res) => {
  const { name, email, phone, birthday, skype, avatarUrl } = req.user;
  res.status(200).json({ name, email, phone, birthday, skype, avatarUrl });
});

module.exports = getCurrent;
