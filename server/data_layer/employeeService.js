var EmployeeModel = require('./../models/employee');
var employeeService = {};

// получение массива записей о сотрудниках из базы данных
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

// получение записи о сотруднике по полю 'id' из базы данных
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

// получение записи о сотруднике по полю 'id' из базы данных
employeeService.getWithoutPopulate = function (id) {
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

// сохранение записи о сотруднике в базу данных
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

// удаление записи о сотруднике из базы данных
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

// удаление записи о проектах сотрудника из базы данных
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
