var log = require('./../utils/log')(module);
var EmployeeModel = require('./../models/employee');
var employeeService = require('./../services/employeeService');
var employeeHelper = {};

employeeHelper.getAll = function (req, res, next) {
    return employeeService.getAll().then(function (employees) {
        return res.send(employees);
    }, function (err) {
        return next(err);
    });
}

employeeHelper.get = function (req, res, next) {
    employeeService.get(req.params.id).then(function (employee) {
        return res.send(employee);
    }).catch(function (err) {
        return next(err);
    });
}

employeeHelper.update = function (req, res, next) {
    employeeService.get(req.params.id).then(function (employee) {
        employee.firstname = req.body.newEmployee.firstname;
        employee.lastname = req.body.newEmployee.lastname;
        employee.patronymic = req.body.newEmployee.patronymic;
        employee.birthday = req.body.newEmployee.birthday;
        employee.department = req.body.newEmployee.department;
        employee.group = req.body.newEmployee.group;
        employee.room = req.body.newEmployee.room;
        employee.dateEmployment = req.body.newEmployee.dateEmployment;
        return employeeService.save(employee);
    }).then(function (employee) {
        log.info('employee updated');
        return res.send({ employee: employee });
    }).catch(function (err) {
        return next(err);
    });
}

employeeHelper.add = function (req, res, next) {
    var employee = new EmployeeModel({
        firstname : req.body.newEmployee.firstname,
        lastname : req.body.newEmployee.lastname,
        patronymic : req.body.newEmployee.patronymic,
        birthday : req.body.newEmployee.birthday,
        department : req.body.newEmployee.department,
        group : req.body.newEmployee.group,
        room : req.body.newEmployee.room,
        dateEmployment : req.body.newEmployee.dateEmployment
    });
    employeeService.save(employee).then(function (employee) {
        log.info('employee created');
        return res.send(employee);
    }, function (err) {
        return next(err);
    });
}

employeeHelper.remove = function (req, res, next) {
    employeeService.get(req.params.id).then(function (employee) {
        return employeeService.remove(employee);
    }).then(function () {
        log.info('employee removed');
        return res.send({ status: 'OK' });
    }).catch(function (err) {
        return next(err);
    });

}

module.exports = employeeHelper;
