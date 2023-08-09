const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrent = require('./getCurrent');
const updateAvatar = require('./updateAvatar');
const updateProfile = require('./updateProfile');
const verifyEmail = require('./verifyEmail');
const sendVerificationEmail = require('./sendVerificationEmail');

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
  updateProfile,
  verifyEmail,
  sendVerificationEmail,
};
