const ejs = require('ejs');

const HttpError = require('./HttpError');

const renderEjsTemplate = (file, data) => {
  let html = 'There should be HTML markup!';

  ejs.renderFile(file, data, (error, markup) => {
    if (error) throw HttpError(500, error.message);
    html = markup;
  });
  return html;
};

module.exports = renderEjsTemplate;
