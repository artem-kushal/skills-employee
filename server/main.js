var express = require('express');
var app = express();
var log = require('./utils/log')(module);
var config = require('./libs/config');
var mongo = require('mongodb');
var mongoose = require('./libs/mongoose');
var middleware = require('./middleware')(app, express);

var appEnv = app.get('env');

var port = process.env.OPENSHIFT_NODEJS_PORT || config.get(appEnv + ':port');
var ipAdress = process.env.OPENSHIFT_NODEJS_IP || "localhost"; 

mongoose.once('open', function callback() {
    var server = app.listen(port, ipAdress, function () {
        log.info('Express server listening on port ' + config.get(appEnv + ':port') + ' in ' + appEnv + ' mode');
    });
});
