var EmployeeModel = require('./../models/employee');
var employeeService = {};

employeeService.getAll = function () {
    return new Promise(function (resolve, reject) {
        EmployeeModel.find().exec(function (err, employees) {
            if (err) {
                reject(err);
            } else {
                resolve(employees);
            }
        });
    });
}

employeeService.get = function (id) {
    return new Promise(function (resolve, reject) {
        EmployeeModel.findById(id).populate('technologies.tech').populate('technologies.subTech').exec(function (err, employee) {
            if (err) {
                reject(err);
            } else {
                resolve(employee);
            }
        });
    });
}

employeeService.getWithoutPopulate = function (id) { // нужно для добавления проекта
    return new Promise(function (resolve, reject) {
        EmployeeModel.findById(id).exec(function (err, employee) {
            if (err) {
                reject(err);
            } else {
                resolve(employee);
            }
        });
    });
}

employeeService.save = function (employee) {
    return new Promise(function (resolve, reject) {
        employee.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(employee);
            }
        });
    });
}

employeeService.remove = function (employee) {
    return new Promise(function (resolve, reject) {
        employee.remove(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(employee);
            }
        });
    });
}

employeeService.getEmpoyeeByProjectDate = function (date) {
    return new Promise(function (resolve, reject) {
        EmployeeModel.find({}, 'firstname lastname patronymic projects').exec(function (err, employees) {
            if (err) {
                reject(err);
            } else {
                resolve(employees);
            }
        });
    });
}

module.exports = employeeService;
