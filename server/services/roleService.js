var RoleModel = require('./../models/role').RoleModel;
var roleService = {};

roleService.getAll = function () {
    return new Promise(function (resolve, reject) {
        RoleModel.find().exec(function (err, roles) {
            if (err) {
                reject(err);
            } else {
                resolve(roles);
            }
        });
    });
}

roleService.get = function (id) {
    return new Promise(function (resolve, reject) {
        RoleModel.findById(id, function (err, role) {
            if (err || !role) {
                reject(err);
            } else {
                resolve(role);
            }
        });
    });
}

roleService.save = function (role) {
    return new Promise(function (resolve, reject) {
        role.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(role);
            }
        });
    });
}

roleService.remove = function (role) {
    return new Promise(function (resolve, reject) {
        role.remove(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = roleService;
