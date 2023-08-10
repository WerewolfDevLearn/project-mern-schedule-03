const Task = require('../../models/task');
const ctrlWrapper = require('../../decorators/ctrlWrapper');
const HttpError = require('../../utils/HttpError');

const addTask = async (req, res) => {
  const body = req.body;
  const { start, end } = req.body;
  const owner = req.user?._id;

  if (!owner) {
    throw HttpError(400, 'Missing owner');
  }

  if (!body) {
    throw HttpError(400, 'Missing body of request');
  }

  if (start >= end) {
    throw HttpError(400, 'END time must be greater than START time.');
  }

  const task = await Task.create({ ...body, owner });

  if (!task) {
    throw HttpError(500, 'Failed to create a task');
  }

  res.status(201).json({
    message: 'Task added successfully',
    task,
  });
};

module.exports = ctrlWrapper(addTask);
