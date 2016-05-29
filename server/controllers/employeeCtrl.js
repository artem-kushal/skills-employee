var log = require('./../utils/log')(module);
var EmployeeModel = require('./../models/employee');
var employeeService = require('./../data_layer/employeeService');
var projectService = require('../data_layer/projectService');
var employeeHelper = require('./employeeHelper')
var employeeCtrl = {};

employeeCtrl.getAll = function (req, res, next) {
    return employeeService.getAll().then(function (employees) {
        return res.send(employees);
    }, function (err) {
        return next(err);
    });
}

employeeCtrl.get = function (req, res, next) {
    employeeService.get(req.params.id).then(function (employee) {
        return res.send(employee);
    }).catch(function (err) {
        return next(err);
    });
}

employeeCtrl.update = function (req, res, next) {
    employeeService.get(req.params.id).then(function (employee) {
        employee.firstname = req.body.newEmployee.firstname;
        employee.lastname = req.body.newEmployee.lastname;
        employee.patronymic = req.body.newEmployee.patronymic;
        employee.birthday = req.body.newEmployee.birthday;
        employee.department = req.body.newEmployee.department;
        employee.group = req.body.newEmployee.group;
        employee.room = req.body.newEmployee.room;
        employee.dateEmployment = req.body.newEmployee.dateEmployment;
        employee.role = req.body.newEmployee.role;
        return employeeService.save(employee);
    }).then(function (employee) {
        log.info('employee updated');
        return res.send({ employee: employee });
    }).catch(function (err) {
        return next(err);
    });
}

employeeCtrl.add = function (req, res, next) {
    var employee = new EmployeeModel({
        firstname : req.body.newEmployee.firstname,
        lastname : req.body.newEmployee.lastname,
        patronymic : req.body.newEmployee.patronymic,
        birthday : req.body.newEmployee.birthday,
        department : req.body.newEmployee.department,
        group : req.body.newEmployee.group,
        room : req.body.newEmployee.room,
        role : req.body.newEmployee.role,
        dateEmployment : req.body.newEmployee.dateEmployment
    });
    employeeService.save(employee).then(function (employee) {
        log.info('employee created');
        return res.send(employee);
    }, function (err) {
        return next(err);
    });
}

employeeCtrl.addProject = function (req, res, next) {
    employeeService.getWithoutPopulate(req.params.id).then(function (employee) {
        employee = employeeHelper.addProject(employee, req.body.addProject, req.body.projectDate);
        return employeeService.save(employee);
    }).then(function (employee) {
        return employeeService.get(req.params.id);
    }).then(function (employee) {
        log.info('project added to employee');
        return res.send({ employee: employee });
    }).catch(function (err) {
        return next(err);
    });
}

employeeCtrl.removeProject = function (req, res, next) {
    var editEmployee;
    employeeService.getWithoutPopulate(req.params.id).then(function (employee) {
        var projectsId = [];
        var removedIndex;
        for (var i = 0; i < employee.projects.length; i++) { // удаляем проект у сотрудника
            if (employee.projects[i]._id.equals(req.body.project._id)) {
                removedIndex = i;
            } else {
                projectsId.push(employee.projects[i].projId);
            }
        }
        employee.projects.splice(removedIndex, 1);
        editEmployee = employee;
        return projectService.getEmployeeProject(projectsId);
    }).then(function (projectsEmployee) {
        editEmployee = employeeHelper.removeProject(editEmployee, projectsEmployee);
        return employeeService.save(editEmployee);
    }).then(function (employee) {
        return employeeService.get(req.params.id);
    }).then(function (employee) {
        log.info('project removed from employee');
        return res.send({ employee: employee });
    }).catch(function (err) {
        return next(err);
    });
}

employeeCtrl.remove = function (req, res, next) {
    employeeService.get(req.params.id).then(function (employee) {
        return employeeService.remove(employee);
    }).then(function () {
        log.info('employee removed');
        return res.send({ status: 'OK' });
    }).catch(function (err) {
        return next(err);
    });

}

module.exports = employeeCtrl;
