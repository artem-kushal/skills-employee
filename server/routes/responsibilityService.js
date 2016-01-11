var log = require('./../utils/log')(module);
var ResponsibilityModel = require('./../models/responsibility').ResponsibilityModel;
var responsibilityService = {};

responsibilityService.getAll = function (req, res) {
    return ResponsibilityModel.find().exec(function (err, responsibilities) {
        if (!err) {
            return res.send(responsibilities);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({ error: 'Server error' });
        }
    });
}

responsibilityService.update = function (req, res) {
    return ResponsibilityModel.findById(req.params.id, function (err, responsibility) {
        if (!responsibility) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        responsibility.name = req.body.name;
        return responsibility.save(function (err) {
            if (!err) {
                log.info('responsibility updated');
                return res.send({ responsibility: responsibility });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    });
}

responsibilityService.add = function (req, res) {
    var responsibility = new ResponsibilityModel({
        name: req.body.name
    });

    responsibility.save(function (err) {
        if (!err) {
            log.info('responsibility created');
            return res.send({ responsibility : responsibility });
        } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
            log.error('Internal error(%d): %s', res.statusCode, err.message);
        }
    });
}

responsibilityService.remove = function (req, res) {
        return ResponsibilityModel.findById(req.params.id, function (err, responsibility) {
            return responsibility.remove(function (err) {
                if (!err) {
                    log.info('responsibility removed');
                    return res.send({ status: 'OK' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                    log.error('Internal error(%d): %s', res.statusCode, err.message);
                }
            });
        });
    }

module.exports = responsibilityService;
