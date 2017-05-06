var helpers = require('./helpers.js');
var express = require('express');

module.exports = function (app, express) {

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

}