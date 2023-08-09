const Review = require('../../models/review');
const ctrlWrapper = require('../../decorators/ctrlWrapper');
const HttpError = require('../../utils/HttpError');

const updateReview = async (req, res) => {
  const owner = req.user?._id;

  if (!owner) {
    throw HttpError(400, 'Missing owner');
  }

  if (!req.body) {
    throw HttpError(400, 'Missing body of request');
  }

  const review = await Review.findOneAndUpdate({ owner }, req.body, { new: true });

  if (!review) {
    throw HttpError(404, 'Review not found for update');
  }

  res.json({
    message: 'Review edited successfully',
    review,
  });
};

module.exports = ctrlWrapper(updateReview);
