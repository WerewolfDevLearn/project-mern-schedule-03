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

const refreshSchema = Joi.object({ refreshToken: Joi.string().required() });

const updateProfileShema = Joi.object({
  name: Joi.string().alphanum().min(4).required(),
  birthday: Joi.string().allow(null).allow('').optional(),
  phone: Joi.string().allow(null).allow('').optional(),
  skype: Joi.string().allow(null).allow('').optional(),
  avatarUrl: Joi.string().allow('').optional(),
});

const verifyEmailSchema = Joi.object({
  verificationCode: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshSchema,
  updateProfileShema,
  verifyEmailSchema,
};
