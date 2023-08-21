const authGoogle = require('./authGoogle');
const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const refresh = require('./refresh');
const getCurrent = require('./getCurrent');
const deleteCurrent = require('./deleteCurrent');
const updateProfile = require('./updateProfile');
const updatePassword = require('./updatePassword');
const updateEmail = require('./updateEmail');
const verifyEmail = require('./verifyEmail');
const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');

module.exports = {
  authGoogle,
  register,
  login,
  logout,
  refresh,
  getCurrent,
  deleteCurrent,
  updateProfile,
  updatePassword,
  updateEmail,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
