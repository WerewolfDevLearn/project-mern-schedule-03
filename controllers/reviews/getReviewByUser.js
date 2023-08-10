const Review = require('../../models/review');
const ctrlWrapper = require('../../decorators/ctrlWrapper');
const HttpError = require('../../utils/HttpError');

const getReviewByUser = async (req, res) => {
  const owner = req.user?._id;

  if (!owner) {
    throw HttpError(400, 'Missing owner');
  }

  const review = await Review.find({ owner }).populate('owner', '_id name avatarUrl');

  if (!review) {
    throw HttpError(404, 'Not found reviews');
  }

  res.json(review);
};

module.exports = ctrlWrapper(getReviewByUser);
