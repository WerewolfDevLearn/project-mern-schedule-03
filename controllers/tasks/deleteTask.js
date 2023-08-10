const Task = require('../../models/task');
const ctrlWrapper = require('../../decorators/ctrlWrapper');
const HttpError = require('../../utils/HttpError');

const deleteTask = async (req, res) => {
  const owner = req.user?._id;
  const { id } = req.params;

  if (!owner) {
    throw HttpError(400, 'Missing owner');
  }

  const task = await Task.findByIdAndRemove({ _id: id, owner });

  if (!task) {
    throw HttpError(404, 'Task not found for delete');
  }

  res.json({
    message: 'Task deleted successfully',
  });
};

module.exports = ctrlWrapper(deleteTask);
