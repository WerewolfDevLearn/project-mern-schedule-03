const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrent = require('./getCurrent');
const updateAvatar = require('./updateAvatar');
const { verifyEmail, resendEmail } = require('./verifyEmail');

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
  verifyEmail,
  resendEmail,
};
