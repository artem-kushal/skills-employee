var log = require('./../utils/log')(module);
var ResponsibilityModel = require('./../models/responsibility').ResponsibilityModel;
var responsibilityService = {};

responsibilityService.getAll = function (req, res) {
    return ResponsibilityModel.find().exec(function (err, responsibilities) {
        if (!err) {
            return res.send(responsibilities);
        } else {
            return next(err);
        }
    });
}

responsibilityService.update = function (req, res) {
    return ResponsibilityModel.findById(req.params.id, function (err, responsibility) {
        if (!responsibility) {
            return next(404);
        }
        responsibility.name = req.body.name;
        return responsibility.save(function (err) {
            if (!err) {
                log.info('responsibility updated');
                return res.send({ responsibility: responsibility });
            } else {
                return next(err);
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
            return next(err);
        }
    });
}

responsibilityService.remove = function (req, res) {
        return ResponsibilityModel.findById(req.params.id, function (err, responsibility) {
            if (!responsibility) {
                return next(404);
            }
            return responsibility.remove(function (err) {
                if (!err) {
                    log.info('responsibility removed');
                    return res.send({ status: 'OK' });
                } else {
                    return next(err);
                }
            });
        });
    }

module.exports = responsibilityService;
