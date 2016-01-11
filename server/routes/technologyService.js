var log = require('./../utils/log')(module);
var TechnologyModel = require('./../models/tech').TechnologyModel;
var SubTechModel = require('./../models/tech').SubTechModel;
var technologyService = {};

technologyService.getAll = function (req, res, next) {
    return TechnologyModel.find().populate('subTech').exec(function (err, technologies) {
        if (!err) {
            return res.send(technologies);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            res.send({ error: 'Server error' });
        }
    });
}

technologyService.update = function (req, res) {
    return TechnologyModel.findById(req.params.id, function (err, technology) {
        if (!technology) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        technology.techName = req.body.techName;
        technology.modified = Date.now();
        return technology.save(function (err) {
            if (!err) {
                log.info('technology updated');
                return res.send({ technology: technology });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
                log.error('Internal error(%d): %s', res.statusCode, err.message);
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
            res.statusCode = 500;
            res.send({ error: 'Server error' });
            log.error('Internal error(%d): %s', res.statusCode, err.message);
        }
    });
}

technologyService.remove = function (req, res) {
    return TechnologyModel.findById(req.params.id, function (err, technology) {
        return technology.remove(function (err) {
            if (!err){
                for (var i = 0; i < technology.subTech.length;i++) {
                    SubTechModel.findById(technology.subTech[i], function (err, subtech) {
                        return subtech.remove(function (err) {
                            if (err){
                                res.statusCode = 500;
                                res.send({ error: 'Server error' });
                                log.error('Internal error(%d): %s', res.statusCode, err.message);
                            }
                        });
                    });
                }
                log.info('technology removed');
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    });
}

module.exports = technologyService;
