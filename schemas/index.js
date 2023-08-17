const { reveiwSchema, updateReveiwSchema } = require('./review');
const validTask = require('./task');

const {
  registerSchema,
  loginSchema,
  refreshSchema,
  updateProfileShema,
  updatePassword,
  updateEmail,
  verifyEmailSchema,
} = require('./user');

module.exports = {
  reveiwSchema,
  updateReveiwSchema,
  validTask,

  registerSchema,
  loginSchema,
  refreshSchema,
  updateProfileShema,
  updatePassword,
  updateEmail,
  verifyEmailSchema,
};
