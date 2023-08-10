const { format } = require('date-fns');

const formatDate = format(new Date(), 'yyyy-MM-dd');

module.exports = formatDate;
