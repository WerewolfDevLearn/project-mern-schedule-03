const nodemailer = require('nodemailer');

const path = require('path');

const { convert } = require('html-to-text');

const renderEjsTemplate = require('./renderEjsTemplate');

const { UKR_NET_EMAIL, UKR_NET_PASSWORD, APP_NAME } = process.env;

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (to, verificationCode) => {
  const file = path.join(__dirname, '..', 'views', 'verification.ejs');
  const html = renderEjsTemplate(file, { APP_NAME, to, verificationCode });

  const emailOptions = {
    from: `"Support" <${UKR_NET_EMAIL}>`,
    to,
    subject: `${APP_NAME} Confirmation`,
    text: convert(html),
    html,
  };

  try {
    await transport.sendMail(emailOptions);
    console.log(`Email sent to ${emailOptions.to}`);
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

module.exports = sendEmail;
