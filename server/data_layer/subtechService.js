var SubTechModel = require('./../models/tech').SubTechModel;
var subtechService = {};

subtechService.get = function (id) {
    return new Promise(function (resolve, reject) {
        SubTechModel.findById(id, function (err, subtech) {
            if (err) {
                reject(err);
            } else {
                resolve(subtech);
            }
        });
    });
}

subtechService.save = function (subtech) {
    return new Promise(function (resolve, reject) {
        subtech.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(subtech);
            }
        });
    });
}

subtechService.remove = function (subtech) {
    return new Promise(function (resolve, reject) {
        subtech.remove(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(subtech);
            }
        });
    });
}

module.exports = subtechService;
