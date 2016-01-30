var log = require('../utils/log')(module);
var HttpError = require('../error').HttpError;
var errorHandler = require('errorhandler');

var sendHttpError = function (error, res) {
    res.status(error.status);
    res.json(error);
};

module.exports = function (app, express) {

    app.use(function (err, req, res, next) {
        if (typeof err === 'number') {
            err = new HttpError(err);
        }
        if (err.name === 'ValidationError') {
            log.error(err);
            err = new HttpError(400, err.message);
        }
        if (err instanceof HttpError) {
            sendHttpError(err, res);
        } else {
            if (app.get('env') === 'development') {
                errorHandler()(err, req, res, next);
            } else {
                log.error(err);
                err = new HttpError(500);
                sendHttpError(err, res);
            }
        }
    });

};
