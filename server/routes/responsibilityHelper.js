var log = require('./../utils/log')(module);
var ResponsibilityModel = require('./../models/responsibility').ResponsibilityModel;
var responsibilityService = require('./../services/responsibilityService');
var responsibilityHelper = {};

responsibilityHelper.getAll = function (req, res, next) {
    return responsibilityService.getAll().then(function (responsibilities) {
        return res.send(responsibilities);
    }, function (err) {
        return next(err);
    });
}

responsibilityHelper.update = function (req, res, next) {
    responsibilityService.get(req.params.id).then(function (responsibility) {
        if (!responsibility) {
            return next(404);
        }
        responsibility.name = req.body.name;
        return responsibilityService.save(responsibility);
    }).then(function (responsibility) {
        log.info('responsibility updated');
        return res.send({ responsibility: responsibility });
    }).catch(function (err) {
        return next(err);
    });
}

responsibilityHelper.add = function (req, res, next) {
    var responsibility = new ResponsibilityModel({
        name: req.body.name
    });
    responsibilityService.save(responsibility).then(function (responsibility) {
        log.info('responsibility created');
        return res.send({ responsibility : responsibility });
    }, function (err) {
        return next(err);
    });
}

responsibilityHelper.remove = function (req, res, next) {
    responsibilityService.get(req.params.id).then(function (responsibility) {
        return responsibilityService.remove(responsibility);
    }).then(function () {
        log.info('responsibility removed');
        return res.send({ status: 'OK' });
    }).catch(function (err) {
        return next(err);
    });

}

module.exports = responsibilityHelper;
