const filterEmptyValue = obj => {
  for (const key in obj) {
    if (!obj[key] || obj[key] === '') {
      delete obj[key];
    }
  }
};

module.exports = filterEmptyValue;
