var log = require('./../utils/log')(module);
var RoleModel = require('./../models/role').RoleModel;
var roleService = require('./../services/roleService');
var roleHelper = {};

roleHelper.getAll = function (req, res, next) {
    return roleService.getAll().then(function (roles) {
        return res.send(roles);
    }, function (err) {
        return next(err);
    });
}

roleHelper.update = function (req, res, next) {
    roleService.get(req.params.id).then(function (role) {
        role.name = req.body.name;
        return roleService.save(role);
    }).then(function (role) {
        log.info('role updated');
        return res.send({ role: role });
    }).catch(function (err) {
        return next(err);
    });
}

roleHelper.add = function (req, res, next) {
    var role = new RoleModel({
        name: req.body.name
    });
    roleService.save(role).then(function (role) {
        log.info('role created');
        return res.send(role);
    }, function (err) {
        return next(err);
    });
}

roleHelper.remove = function (req, res, next) {
    roleService.get(req.params.id).then(function (role) {
        return roleService.remove(role);
    }).then(function () {
        log.info('role removed');
        return res.send({ status: 'OK' });
    }).catch(function (err) {
        return next(err);
    });

}

module.exports = roleHelper;
