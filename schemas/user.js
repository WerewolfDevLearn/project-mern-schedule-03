const Joi = require('joi');

const { regExp, joiError } = require('../utils');

const registerSchema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().pattern(regExp.email).required().error(joiError.email),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(regExp.email).required().error(joiError.email),
  password: Joi.string().min(6).required(),
});

const refreshSchema = Joi.object({ refreshToken: Joi.string().allow('').optional() }); // req.body do not attach refreshToken sometimes !!!

const updateProfileShema = Joi.object({
  name: Joi.string().alphanum().min(4).required(),
  birthday: Joi.string().allow(null).allow('').optional(),
  phone: Joi.string().allow(null).allow('').optional(),
  skype: Joi.string().allow(null).allow('').optional(),
  avatarUrl: Joi.string().allow('').optional(),
});

const updatePasswordSchema = Joi.object({
  newPassword: Joi.string().min(6).required().error(joiError.password),
  confirmPassword: Joi.any()
    .equal(Joi.ref('newPassword'))
    .required()
    .label('Confirm password')
    .error(joiError.password), // .messages({ 'any.only': '{{#label}} does not match' }),
});

const updateEmailSchema = Joi.object({
  email: Joi.string().pattern(regExp.email).required().error(joiError.email),
});

const verifyEmailSchema = Joi.object({
  verificationCode: Joi.string().required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().pattern(regExp.email).required().error(joiError.email),
});

const resetPasswordSchema = Joi.object({
  id: Joi.string().required(),
  pwdToken: Joi.string().required(),
  newPassword: Joi.string().min(6).required().error(joiError.password),
  confirmPassword: Joi.any()
    .equal(Joi.ref('newPassword'))
    .required()
    .label('Confirm password')
    .error(joiError.password),
  // .messages({ 'any.only': '{{#label}} does not match' }),
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshSchema,
  updateProfileShema,
  updatePasswordSchema,
  updateEmailSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
