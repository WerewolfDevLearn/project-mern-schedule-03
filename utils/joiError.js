const email = errors => {
  errors.forEach(err => {
    const { code, message } = err;
    switch (code) {
      case 'string.pattern.base':
        message = 'Enter a valid email';
        break;
      case 'any.required':
        message = 'Email is required';
        break;
      default:
        break;
    }
  });
  return errors;
};

const password = errors => {
  errors.forEach(err => {
    const { code, message, flags } = err;
    switch (code) {
      case 'any.only':
        message = `${flags.label} does not match`;
        break;
      case 'any.required':
        message = 'Password is required';
        break;
      default:
        break;
    }
  });
  return errors;
};

module.exports = { email, password };
