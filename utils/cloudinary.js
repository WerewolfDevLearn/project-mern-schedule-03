const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');

const HttpError = require('./HttpError');

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
});

const options = {
  folder: 'Avatars',
  use_filename: true,
  unique_filename: true,
  overwrite: true,
  transformation: [
    { width: 200, height: 200, gravity: 'faces', crop: 'thumb', zoom: 0.75 },
    { radius: 'max' },
  ],
};

const upload = async imagePath => {
  try {
    const image = await cloudinary.uploader.upload(imagePath, options);
    await fs.unlink(imagePath);
    return image;
  } catch (error) {
    throw HttpError(404, error.message);
  }
};

const destroy = async avatarId => {
  try {
    return await cloudinary.uploader.destroy(avatarId);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { upload, destroy };
