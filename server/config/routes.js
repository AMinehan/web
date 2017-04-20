var helpers = require('./helpers.js');

module.exports = function (app, express) {

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

}