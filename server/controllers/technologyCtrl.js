var log = require('./../utils/log')(module);
var TechnologyModel = require('./../models/tech').TechnologyModel;
var SubTechModel = require('./../models/tech').SubTechModel;
var techService = require('./../data_layer/technologyService');
var subtechService = require('./../data_layer/subtechService');
var technologyCtrl = {};

technologyCtrl.getAll = function (req, res, next) {
    var allSortOrder = undefined;
    subtechService.getAllSortOrders().then(function (sortOrders) {
        allSortOrder = sortOrders;
        return techService.getAll();
    }).then(function (technologies) {
        if (allSortOrder != undefined && allSortOrder.length !== 0) {
            technologies = technologies.map(function (tech) {
                var sortTech = allSortOrder.find(function (sortTech) {
                    return sortTech.techId.toString() == tech._id.toString();
                });
                tech.subTech = sortTech.sortOrder.map(function (subTechSortId) {
                    return tech.subTech.find(function (subTech) {
                        return subTech._id == subTechSortId;
                    });
                });
                return tech;
            });
        }
        return res.send(technologies);
    }).catch(function (err) {
        return next(err);
    });
}

technologyCtrl.update = function (req, res, next) {
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

technologyCtrl.add = function (req, res, next) {
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

technologyCtrl.remove = function (req, res, next) {
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

module.exports = technologyCtrl;
