const { Schema, model } = require('mongoose');

const { mongooseError, regExp } = require('../utils');

const required = [true, 'Required field!'];
const length = lgth => [lgth, `Must be at least ${lgth} characters long!`];
const emailRegex = [regExp.email, 'Invalid email!'];

const userSchema = new Schema(
  {
    name: { type: String, minlength: length(4), required },
    email: { type: String, unique: true, match: emailRegex, required },
    phone: { type: String, default: '' },
    birthday: { type: String, default: '' },
    skype: { type: String, default: '' },
    password: { type: String, minlength: length(6), required },
    token: { type: String, default: null },
    refreshToken: { type: String, default: null },
    avatarUrl: { type: String, default: '' },
    avatarId: { type: String, default: null },
    verifiedEmail: { type: Boolean, default: false, required },
    verificationCode: { type: String, default: null },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', mongooseError);

const User = model('user', userSchema);

module.exports = User;
