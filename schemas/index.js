const { reveiwSchema, updateReveiwSchema } = require('./review');
const validTask = require('./task');

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
  validTask,
  sendVerificationEmailSchema,
};
