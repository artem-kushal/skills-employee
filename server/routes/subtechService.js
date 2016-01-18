var log = require('./../utils/log')(module);
var TechnologyModel = require('./../models/tech').TechnologyModel;
var SubTechModel = require('./../models/tech').SubTechModel;
var subtechService = {};

subtechService.update = function (req, res) {
    return SubTechModel.findById(req.params.id, function (err, subtech) {
        if (!subtech) {
            return next(404);
        }
        subtech.name = req.body.name;
        subtech.modified = Date.now();
        return subtech.save(function (err) {
            if (!err) {
                log.info('subtech updated');
                return res.send({ subtech: subtech });
            } else {
                return next(err);
            }
        });
    });
}

subtechService.add = function (req, res) {
    TechnologyModel.findById(req.body.parentId, function (err, technology) {
        if (!technology) {
            return next(404);
        }
        var newSubTech = new SubTechModel({
            name: req.body.name,
            technology: req.body.parentId
        });
        technology.subTech.push(newSubTech._id);
        return technology.save(function (err) {
            if (!err) {
                log.info('technology updated');
                newSubTech.save(function (err) {
                    if (!err) {
                        log.info('subtech created');
                        return res.send({ newSubTech : newSubTech });
                    } else {
                        return next(err);
                    }
                });
            } else {
                return next(err);
            }
        });
    });
}

subtechService.remove = function (req, res) {
    return SubTechModel.findById(req.params.id, function (err, subtech) {
        if (!subtech) {
            return next(404);
        }
        return subtech.remove(function (err) {
            if (!err){
                TechnologyModel.update({ _id: subtech.technology },
                { $pull : { subTech : subtech._id }},
                function (err, numberAffected) {
                    if (!err){
                        log.info('removed subtech id in technology');
                    } else {
                        return next(err);
                    }
                });
                log.info('subtech removed');
                return res.send({ status: 'OK' });
            } else {
                return next(err);
            }
        });
    });
}

module.exports = subtechService;
