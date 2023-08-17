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

module.exports = { verifyEmail };
