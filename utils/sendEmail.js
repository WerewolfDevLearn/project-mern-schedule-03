const nmMail = require('nodemailer');

const HttpError = require('./HttpError');

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const transporter = nmMail.createTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: { user: UKR_NET_EMAIL, pass: UKR_NET_PASSWORD },
});

const nodemailer = async msg => {
  try {
    await transporter.sendMail(msg);
  } catch (error) {
    throw HttpError(500, error.message);
  }
};

module.exports = { nodemailer };
