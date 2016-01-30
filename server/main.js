var express = require('express');
var app = express();
var log = require('./utils/log')(module);
var config = require('./libs/config');
var mongo = require('mongodb');
var mon = require('./libs/mongoose');
var middleware = require('./middleware')(app, express);

var appEnv = app.get('env');
var server = app.listen(config.get('development:port'), function () {
    log.info('Express server listening on port ' + config.get(appEnv + ':port') + ' in ' + appEnv + ' mode');
})
