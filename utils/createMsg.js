const path = require('path');

const { convert } = require('html-to-text');

const renderEjsTemplate = require('./renderEjsTemplate');
const { APP_NAME, UKR_NET_EMAIL } = process.env;

// Veryfy email message
const verifyEmail = (to, verificationCode) => {
  const file = path.join(__dirname, '..', 'views', 'verification.ejs');
  const html = renderEjsTemplate(file, { APP_NAME, to, verificationCode });

  return {
    from: `"Support" <${UKR_NET_EMAIL}>`,
    to,
    subject: `${APP_NAME} Confirmation`,
    text: convert(html),
    html,
  };
};

// Change ppassword message
const changePassword = to => {
  const file = path.join(__dirname, '..', 'views', 'autoPassword.ejs');
  const html = renderEjsTemplate(file, { APP_NAME, to });

  return {
    from: `"Support" <${UKR_NET_EMAIL}>`,
    to,
    subject: `${APP_NAME} Notification`,
    text: convert(html),
    html,
  };
};

// Forgot ppassword message
const forgotPassword = (to, link) => {
  const file = path.join(__dirname, '..', 'views', 'forgotPassword.ejs');
  const html = renderEjsTemplate(file, { APP_NAME, link });

  return {
    from: `"Support" <${UKR_NET_EMAIL}>`,
    to,
    subject: `${APP_NAME} Notification`,
    text: convert(html),
    html,
  };
};

module.exports = { verifyEmail, changePassword, forgotPassword };
