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

module.exports = {
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
};
