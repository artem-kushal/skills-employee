var log = require('./../utils/log')(module);
var TechnologyModel = require('./../models/tech').TechnologyModel;
var SubTechModel = require('./../models/tech').SubTechModel;
var subtechService = {};

subtechService.update = function (req, res) {
    return SubTechModel.findById(req.params.id, function (err, subtech) {
        if (!subtech) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        subtech.name = req.body.name;
        subtech.modified = Date.now();
        return subtech.save(function (err) {
            if (!err) {
                log.info('subtech updated');
                return res.send({ subtech: subtech });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    });
}

subtechService.add = function (req, res) {
    TechnologyModel.findById(req.body.parentId, function (err, technology) {
        if (!technology) {
            res.statusCode = 404;
            return res.send({ error: 'Parent technology not found' });
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
                        res.statusCode = 500;
                        res.send({ error: 'Server error' });
                        log.error('Internal error(%d): %s', res.statusCode, err.message);
                    }
                });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    });
}

subtechService.remove = function (req, res) {
    return SubTechModel.findById(req.params.id, function (err, subtech) {
        return subtech.remove(function (err) {
            if (!err){
                TechnologyModel.update({ _id: subtech.technology },
                { $pull : { subTech : subtech._id }},
                function (err, numberAffected) {
                    if (!err){
                        log.info('removed subtech id in technology');
                    } else {
                        res.statusCode = 500;
                        res.send({ error: 'Server error' });
                        log.error('Internal error(%d): %s', res.statusCode, err.message);
                    }
                });
                log.info('subtech removed');
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    });
}

module.exports = subtechService;
