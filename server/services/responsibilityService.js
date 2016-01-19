var ResponsibilityModel = require('./../models/responsibility').ResponsibilityModel;
var responsibilityService = {};

responsibilityService.getAll = function () {
    return new Promise(function (resolve, reject) {
        ResponsibilityModel.find().exec(function (err, responsibilities) {
            if (err) {
                reject(err);
            } else {
                resolve(responsibilities);
            }
        });
    });
}

responsibilityService.get = function (id) {
    return new Promise(function (resolve, reject) {
        ResponsibilityModel.findById(id, function (err, responsibility) {
            if (err) {
                reject(err);
            } else {
                resolve(responsibility);
            }
        });
    });
}

responsibilityService.save = function (responsibility) {
    return new Promise(function (resolve, reject) {
        responsibility.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(responsibility);
            }
        });
    });
}

responsibilityService.remove = function (responsibility) {
    return new Promise(function (resolve, reject) {
        responsibility.remove(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(responsibility);
            }
        });
    });
}

module.exports = responsibilityService;
