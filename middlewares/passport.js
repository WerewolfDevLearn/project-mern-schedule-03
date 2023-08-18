const passport = require('passport');
const { Strategy } = require('passport-google-oauth2');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { sendEmail, createMsg } = require('../utils');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/users/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (request, accessToken, refreshToken, profile, done) => {
  try {
    const { email, displayName, verified, picture } = profile;
    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    }
    // Create user
    const password = await bcrypt.hash(crypto.randomUUID(), 10);
    const newUser = await User.create({
      name: displayName,
      email,
      password,
      verifiedEmail: verified,
      avatarUrl: picture,
    });
    // Send avtocreate password notification
    const msg = createMsg.changePassword(email);
    await sendEmail.nodemailer(msg);

    return done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use('google', googleStrategy);

module.exports = passport;
