var log = require('./../utils/log')(module);
var RoleModel = require('./../models/role').RoleModel;
var roleService = {};

roleService.getAll = function (req, res, next) {
    return RoleModel.find().exec(function (err, roles) {
        if (!err) {
            return res.send(roles);
        } else {
            return next(err);
        }
    });
}

roleService.update = function (req, res, next) {
    return RoleModel.findById(req.params.id, function (err, role) {
        if (!role) {
            return next(404);
        }
        role.name = req.body.name;
        return role.save(function (err) {
            if (!err) {
                log.info('role updated');
                return res.send({ role: role });
            } else {
                return next(err);
            }
        });
    });
}

roleService.add = function (req, res) {
    var role = new RoleModel({
        name: req.body.name
    });

    role.save(function (err) {
        if (!err) {
            log.info('role created');
            return res.send({ role : role });
        } else {
            return next(err);
        }
    });
}

roleService.remove = function (req, res) {
    return RoleModel.findById(req.params.id, function (err, role) {
        if (!role) {
            return next(404);
        }
        return role.remove(function (err) {
            if (!err) {
                log.info('role removed');
                return res.send({ status: 'OK' });
            } else {
                return next(err);
            }
        });
    });
}

module.exports = roleService;
