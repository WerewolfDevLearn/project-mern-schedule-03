const Task = require('../../models/task');
const ctrlWrapper = require('../../decorators/ctrlWrapper');
const HttpError = require('../../utils/HttpError');

const updateTask = async (req, res) => {
  const owner = req.user?._id;
  const { id } = req.params;

  if (!owner) {
    throw HttpError(400, 'Missing owner');
  }

  if (!req.body) {
    throw HttpError(400, 'Missing body of request');
  }

  const { title, start, end, priority, date, category } = req.body;

  if (!title || !start || !end || !priority || !date || !category) {
    throw HttpError(400, 'Missing field');
  }

  if (start >= end) {
    throw HttpError(400, 'END time must be greater than START time.');
  }

  const task = await Task.findByIdAndUpdate({ _id: id, owner }, req.body, { new: true });

  if (!task) {
    throw HttpError(404, 'Task not found for update');
  }

  res.json({
    message: 'Task edited successfully',
    task,
  });
};

module.exports = ctrlWrapper(updateTask);
