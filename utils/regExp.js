const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const TIME_REGEXP = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; // від 00:00 до 23:59.
const DATE_REGEXP = /^\d{4}-((0[1-9])|(1[012]))-((0[1-9]|[12]\d)|3[01])$/; // 2023-08-09

module.exports = { email, TIME_REGEXP, DATE_REGEXP };
