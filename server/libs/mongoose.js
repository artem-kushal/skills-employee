var mongoose = require('mongoose');
var log = require('./../utils/log')(module);
var config = require('./config');

var appEnv = config.get('NODE_ENV') || 'development';

mongoose.connect(config.get(appEnv + ':mongoose:uri'));


var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});

db.once('open', function callback() {
    log.info('Connected to DB!');
});

module.exports = db;
