var log = require('./../utils/log')(module);
var TechnologyModel = require('./../models/tech').TechnologyModel;
var SubTechModel = require('./../models/tech').SubTechModel;
var subtechService = require('./../data_layer/subtechService');
var techService = require('./../data_layer/technologyService');
var subtechCtrl = {};

subtechCtrl.update = function (req, res, next) {
    subtechService.get(req.params.id).then(function (subtech) {
        if (!subtech) {
            return next(404);
        }
        subtech.name = req.body.name;
        subtech.modified = Date.now();
        return subtechService.save(subtech);
    }).then(function (subtech) {
        log.info('subtech updated');
        return res.send({ subtech: subtech });
    }).catch(function (err) {
        return next(err);
    });
}

subtechCtrl.add = function (req, res, next) {
    techService.get(req.body.parentId).then(function (technology) {
        if (!technology) {
            return next(404);
        }
        var newSubTech = new SubTechModel({
            name: req.body.name,
            technology: req.body.parentId
        });
        technology.subTech.push(newSubTech._id);
        return Promise.all([techService.save(technology), subtechService.save(newSubTech)]);
    }).then(function (results) {
        log.info('subtech created');
        return res.send({ newSubTech : results[1] });
    }).catch(function (err) {
        return next(err);
    });
}

subtechCtrl.remove = function (req, res, next) {
    subtechService.get(req.params.id).then(function (subtech) {
        if (!subtech) {
            return next(404);
        }
        return subtechService.remove(subtech);
    }).then(function (subtech) {
        return techService.updateSubtech(subtech);
    }).then(function () {
        log.info('subtech removed');
        return res.send({ status: 'OK' });
    }).catch(function (err) {
        return next(err);
    });
}

module.exports = subtechCtrl;
