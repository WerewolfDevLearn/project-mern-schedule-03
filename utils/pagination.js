const pagination = (persistPage = 1, persistLimit = 10) => {
  const parsePage = parseInt(persistPage);
  const parseLimit = parseInt(persistLimit);
  const page = parsePage >= 1 ? parsePage : 1;
  const limit = parseLimit > 1 && parseLimit < 10 ? parseLimit : 10;
  const skip = (page - 1) * limit;

  return { page, skip, limit };
};

module.exports = pagination;
