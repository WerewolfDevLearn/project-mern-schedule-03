const globalErrorHandler = (err, req, res, next) => {
  const { status = 500, message = 'Somethitd went wrong!' } = err;

  res.status(status).json({ message });
};

module.exports = globalErrorHandler;
