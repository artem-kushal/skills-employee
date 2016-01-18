var log = require('./../utils/log')(module);
var TechnologyModel = require('./../models/tech').TechnologyModel;
var SubTechModel = require('./../models/tech').SubTechModel;
var technologyService = {};

technologyService.getAll = function (req, res, next) {
    return TechnologyModel.find().populate('subTech').exec(function (err, technologies) {
        if (!err) {
            return res.send(technologies);
        } else {
            return next(err);
        }
    });
}

technologyService.update = function (req, res) {
    return TechnologyModel.findById(req.params.id, function (err, technology) {
        if (!technology) {
            return next(404);
        }
        technology.techName = req.body.techName;
        technology.modified = Date.now();
        return technology.save(function (err) {
            if (!err) {
                log.info('technology updated');
                return res.send({ technology: technology });
            } else {
                return next(err);
            }
        });
    });
}

technologyService.add = function (req, res) {
    var technology = new TechnologyModel({
        techName: req.body.techName
    });

    technology.save(function (err) {
        if (!err) {
            log.info('technology created');
            return res.send({ technology : technology });
        } else {
            return next(err);
        }
    });
}

technologyService.remove = function (req, res) {
    return TechnologyModel.findById(req.params.id, function (err, technology) {
        if (!technology) {
            return next(404);
        }
        return technology.remove(function (err) {
            if (!err){
                for (var i = 0; i < technology.subTech.length;i++) {
                    SubTechModel.findById(technology.subTech[i], function (err, subtech) {
                        return subtech.remove(function (err) {
                            if (err){
                                return next(err);
                            }
                        });
                    });
                }
                log.info('technology removed');
                return res.send({ status: 'OK' });
            } else {
                return next(err);
            }
        });
    });
}

module.exports = technologyService;
