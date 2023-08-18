const Review = require('../../models/review');
const ctrlWrapper = require('../../decorators/ctrlWrapper');
const HttpError = require('../../utils/HttpError');

const pagination = require('../../utils/pagination');

const getAll = async (req, res) => {
  const { page: currentPage, limit: currentLimit } = req.query;

  const { page, limit, skip } = pagination(currentPage, currentLimit);

  const reviews = await Review.aggregate([
    {
      $match: {
        owner: { $exists: true, $ne: null },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'owner',
        foreignField: '_id',
        as: 'owner',
      },
    },
    {
      $unwind: '$owner',
    },
    {
      $project: {
        _id: 1,
        rating: 1,
        comment: 1,
        createdAt: 1,
        updatedAt: 1,
        owner: {
          _id: 1,
          name: 1,
          avatarUrl: 1,
        },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);

  if (!reviews) {
    throw HttpError(404, 'Not found reviews');
  }

  const totalReviews = await Review.find().count();

  res.json({
    reviews,
    totalReviews,
    totalPages: Math.ceil(totalReviews / limit),
    currentPage: page,
    limit,
  });
};

module.exports = ctrlWrapper(getAll);
