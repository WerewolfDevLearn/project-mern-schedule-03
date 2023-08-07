const handleMongooseError = (error, data, next) => {
  // for unique credential
  const { name, code } = error;
  // 409 Conflict
  const status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  error.status = status;
  next();
};

module.exports = handleMongooseError;
