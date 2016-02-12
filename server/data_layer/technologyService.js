var TechnologyModel = require('./../models/tech').TechnologyModel;
var technologyService = {};

technologyService.getAll = function () {
    return new Promise(function (resolve, reject) {
        TechnologyModel.find().populate('subTech').exec(function (err, technologies) {
            if (err) {
                reject(err);
            } else {
                resolve(technologies);
            }
        });
    });
}

technologyService.get = function (id) {
    return new Promise(function (resolve, reject) {
        TechnologyModel.findById(id, function (err, technology) {
            if (err) {
                reject(err);
            } else {
                resolve(technology);
            }
        });
    });
}

technologyService.save = function (technology) {
    return new Promise(function (resolve, reject) {
        technology.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(technology);
            }
        });
    });
}

technologyService.updateSubtech = function (subtech) {
    return new Promise(function (resolve, reject) {
        TechnologyModel.update({ _id: subtech.technology },
        { $pull : { subTech : subtech._id }},
        function (err, numberAffected) {
            if (err){
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

technologyService.remove = function (technology) {
    return new Promise(function (resolve, reject) {
        technology.remove(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(technology);
            }
        });
    });
}

module.exports = technologyService;
