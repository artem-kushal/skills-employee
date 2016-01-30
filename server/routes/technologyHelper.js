var log = require('./../utils/log')(module);
var TechnologyModel = require('./../models/tech').TechnologyModel;
var SubTechModel = require('./../models/tech').SubTechModel;
var techService = require('./../services/technologyService');
var subtechService = require('./../services/subtechService');
var technologyHelper = {};

technologyHelper.getAll = function (req, res, next) {
    return techService.getAll().then(function (technologies) {
        return res.send(technologies);
    }, function (err) {
        return next(err);
    });
}

technologyHelper.update = function (req, res, next) {
    techService.get(req.params.id).then(function (technology) {
        if (!technology) {
            return next(404);
        }
        technology.techName = req.body.techName;
        technology.modified = Date.now();
        return techService.save(technology);
    }).then(function (technology) {
        log.info('technology updated');
        return res.send({ technology: technology });
    }).catch(function (err) {
        return next(err);
    });
}

technologyHelper.add = function (req, res, next) {
    var technology = new TechnologyModel({
        techName: req.body.techName
    });
    techService.save(technology).then(function (technology) {
        log.info('technology created');
        return res.send({ technology : technology });
    }, function (err) {
        return next(err);
    });
}

technologyHelper.remove = function (req, res, next) {
    techService.get(req.params.id).then(function (technology) {
        if (!technology) {
            return next(404);
        }
        return techService.remove(technology);
    }).then(function (technology) {
        console.log(technology);
        return Promise.all(technology.subTech.map(subtechService.get));
    }).then(function (subtechs) {
        return Promise.all(subtechs.map(subtechService.remove));
    }).then(function (removedSubtechs) {
        log.info('technology removed');
        return res.send({ status: 'OK' });
    }).catch(function (err) {
        return next(err);
    });
}

module.exports = technologyHelper;