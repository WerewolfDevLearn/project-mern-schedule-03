const User = require('../../models/user');
const Task = require('../../models/task');
const Review = require('../../models/review');
const { ctrlWrapper } = require('../../decorators');
const { cloudinary, HttpError } = require('../../utils');

const deleteCurrent = ctrlWrapper(async (req, res) => {
  const { _id, avatarId } = req.user;

  await Review.deleteMany({ owner: _id });
  const { deletedCount } = await Task.deleteMany({ owner: _id });
  if (avatarId) await cloudinary.destroy(avatarId);

  const delUser = await User.findByIdAndDelete(_id);
  if (!delUser) throw HttpError(500, 'Failed to delete account.');

  res.status(200).json({ message: `User ${delUser.email} deleted!`, deletedTasks: deletedCount });
});

module.exports = deleteCurrent;
