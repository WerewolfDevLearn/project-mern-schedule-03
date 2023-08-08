const Review = require('../../models/review');
const ctrlWrapper = require('../../decorators/ctrlWrapper');
const HttpError = require('../../utils/HttpError');

const pagination = require('../../utils/pagination');

const getAll = async (req, res) => {
  const { page: currentPage, limit: currentLimit } = req.query;

  const { page, limit, skip } = pagination(currentPage, currentLimit);

  const reviews = await Review.find({}, '', { skip, limit })
    .populate('owner', '_id name avatarUrl')
    .sort('-createdAt');

  if (!reviews) {
    throw HttpError(404, 'Not found reviews');
  }

  const totalReviews = await Review.countDocuments();

  res.json({
    reviews,
    totalReviews,
    totalPages: Math.ceil(totalReviews / limit),
    currentPage: page,
    limit,
  });
};

module.exports = ctrlWrapper(getAll);
