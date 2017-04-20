var express = require('express');

var app = express();

app.use(express.static(__dirname + '/'));

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(3000);
console.log('listening on 3000');

module.exports = app;