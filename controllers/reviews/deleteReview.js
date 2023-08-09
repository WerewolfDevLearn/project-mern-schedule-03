const Review = require('../../models/review');
const ctrlWrapper = require('../../decorators/ctrlWrapper');
const HttpError = require('../../utils/HttpError');

const deleteReview = async (req, res) => {
  const owner = req.user?._id;

  if (!owner) {
    throw HttpError(400, 'Missing owner');
  }

  const review = await Review.findOneAndRemove({ owner });

  if (!review) {
    throw HttpError(404, 'Review not found for delete');
  }

  res.json({
    message: 'Review deleted successfully',
  });
};

module.exports = ctrlWrapper(deleteReview);
