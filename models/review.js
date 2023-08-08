const { Schema, model } = require('mongoose');
const handleMongooseError = require('../utils/mongooseError');

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      default: 0,
      required: [true, 'Rate the project'],
    },
    comment: {
      type: String,
      default: '',
      required: [true, 'Add your comment'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      unique: true,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

reviewSchema.post('save', handleMongooseError);

const Review = model('review', reviewSchema);

module.exports = Review;
