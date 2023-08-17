const { reveiwSchema, updateReveiwSchema } = require('./review');
const validTask = require('./task');

const {
  registerSchema,
  loginSchema,
  refreshSchema,
  updateProfileShema,
  verifyEmailSchema,
  sendVerificationEmailSchema,
} = require('./user');

module.exports = {
  registerSchema,
  loginSchema,
  refreshSchema,

  verifyEmailSchema,
  reveiwSchema,
  updateReveiwSchema,

  updateProfileShema,
  validTask,
  sendVerificationEmailSchema,
};
