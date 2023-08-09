
const { registerSchema, loginSchema, verifyEmailSchema } = require('./user');
const { reveiwSchema, updateReveiwSchema } = require('./review');

const {
  registerSchema,
  loginSchema,
  updateProfileShema,
  verifyEmailSchema,
  sendVerificationEmailSchema,
} = require('./user');

module.exports = {
  registerSchema,
  loginSchema,

  verifyEmailSchema,
  reveiwSchema,
  updateReveiwSchema,

  updateProfileShema,
  verifyEmailSchema,
  sendVerificationEmailSchema,

};
