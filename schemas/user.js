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

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(regExp.email).required().error(joiError.email),
  verificationCode: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
};
