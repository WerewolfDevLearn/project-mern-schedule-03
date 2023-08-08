const email = errors => {
  errors.forEach(err => {
    switch (err.code) {
      case 'string.email':
        err.message = 'Enter a valid email';
        break;
      case 'any.required':
        err.message = 'Email is required';
        break;
      default:
        break;
    }
  });
  return errors;
};

module.exports = { email };
