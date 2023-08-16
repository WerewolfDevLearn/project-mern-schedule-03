const register = require('./register');
const login = require('./login');
const refresh = require('./refresh');
const logout = require('./logout');
const getCurrent = require('./getCurrent');
const deleteCurrent = require('./deleteCurrent');
const updateProfile = require('./updateProfile');
const verifyEmail = require('./verifyEmail');
const sendVerificationEmail = require('./sendVerificationEmail');

module.exports = {
  register,
  login,
  refresh,
  logout,
  getCurrent,
  deleteCurrent,
  updateProfile,
  verifyEmail,
  sendVerificationEmail,
};
