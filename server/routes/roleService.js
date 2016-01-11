var log = require('./../utils/log')(module);
var RoleModel = require('./../models/role').RoleModel;
var roleService = {};

roleService.getAll = function (req, res) {
    return RoleModel.find().exec(function (err, roles) {
        if (!err) {
            return res.send(roles);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({ error: 'Server error' });
        }
    });
}

roleService.update = function (req, res) {
    return RoleModel.findById(req.params.id, function (err, role) {
        if (!role) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        role.name = req.body.name;
        return role.save(function (err) {
            if (!err) {
                log.info('role updated');
                return res.send({ role: role });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
                log.error('Internal error(%d): %s', res.statusCode, err.message);
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
            res.statusCode = 500;
            res.send({ error: 'Server error' });
            log.error('Internal error(%d): %s', res.statusCode, err.message);
        }
    });
}

roleService.remove = function (req, res) {
    return RoleModel.findById(req.params.id, function (err, role) {
        return role.remove(function (err) {
            if (!err) {
                log.info('role removed');
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    });
}

module.exports = roleService;
