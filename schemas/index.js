const { registerSchema, loginSchema, verifyEmailSchema } = require('./user');
const { reveiwSchema, updateReveiwSchema } = require('./review');

module.exports = {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  reveiwSchema,
  updateReveiwSchema,
};
