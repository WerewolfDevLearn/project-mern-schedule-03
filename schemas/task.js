const Joi = require('joi');
const { regExp, PRIORITY_ENUM, CATEGORY_ENUM } = require('../utils');

const validTask = Joi.object({
  title: Joi.string().max(250).required().label('Title').messages({
    'any.required': 'Title is required.',
  }),
  start: Joi.string().regex(regExp.TIME_REGEXP).required().label('Start time').messages({
    'string.pattern.base': 'Invalid start time format. Please use "HH:mm" format.',
    'any.required': 'Start time is required.',
  }),
  end: Joi.string().regex(regExp.TIME_REGEXP).required().label('End time').messages({
    'string.pattern.base': 'Invalid end time format. Please use "HH:mm" format.',
    'any.required': 'End time is required.',
  }),
  priority: Joi.string()
    .valid(...PRIORITY_ENUM)
    .required(),
  date: Joi.string().regex(regExp.DATE_REGEXP).required().label('Date').messages({
    'string.pattern.base': 'Invalid date format. Please use "YYYY-MM-DD" format.',
    'any.required': 'Date is required.',
  }),
  category: Joi.string()
    .valid(...CATEGORY_ENUM)
    .required(),
});

module.exports = validTask;
