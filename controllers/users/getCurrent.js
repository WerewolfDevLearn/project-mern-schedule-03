const { ctrlWrapper } = require('../../decorators');

const getCurrent = ctrlWrapper(async (req, res) => {
  const { name, email } = req.user;
  res.status(200).json({ name, email });
});

module.exports = getCurrent;
