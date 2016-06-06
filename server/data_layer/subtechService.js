var SubTechModel = require('./../models/tech').SubTechModel;
var SubTechSortingModel = require('./../models/tech').SubTechSortingModel;
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

subtechService.changeSortOrder = function (sortOrder) {
    return sortOrder.save();
}

subtechService.getSortOrder = function (techId) {
    return SubTechSortingModel.findOne({ techId: techId }).exec();
}

subtechService.getAllSortOrders = function (techId) {
    return SubTechSortingModel.find().exec();
}

module.exports = subtechService;
