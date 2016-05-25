var log = require('./../utils/log')(module);
var employeeService = require('../data_layer/employeeService');
var fs = require('fs');
var Docxtemplater = require('docxtemplater');

var documentCtrl = {};

documentCtrl.getEmploymentReport = function (req, res, next) {
    employeeService.getEmpoyeeByProjectDate().then(function (employees) {
        var file = createDocxFile('employmentReportTemplate.docx', 'employmentReport.docx', {
            "employees" : getEmployeesInfo(employees)
        });
        return res.download(file);
    }).catch(function (err) {
        return next(err);
    });
};

documentCtrl.getHistoryProjectsReport = function (req, res, next) {
    var employeeId = '57017041c8fc8b679f1a2548';
    employeeService.get(employeeId).then(function (employee) {
        var file = createDocxFile('historyReportTemplate.docx', 'historyReport.docx', {
            "fio" : employee.firstname + ' ' + employee.lastname + ' ' + employee.patronymic,
            "projects" : getEmployeeProjects(employee)
        });
        return res.download(file);
    }).catch(function (err) {
        return next(err);
    });
};

function createDocxFile (templateName, fileName, data) {
    var content = fs.readFileSync(__dirname + "/../docFolder/" + templateName, "binary");
    var doc = new Docxtemplater(content);
    doc.setData(data); //set the templateVariables
    doc.render(); // apply data to the file
    var buf = doc.getZip().generate({type:"nodebuffer"});
    fs.writeFileSync(__dirname+"/../docFolder/" + fileName, buf);
    return __dirname + '/../docFolder/'+ fileName;
}

function getEmployeesInfo (employees) {
    return employees.map(function (employee) {
        return {
            date: '12.12.2012',
            fio: employee.firstname + ' ' + employee.lastname + ' ' + employee.patronymic,
            projects: (employee.projects.length !== 0) ? employee.projects.map(function (project) {
                return project.name;
            }).join(',') : "Технологический простой"
        };
    });
}

function getEmployeeProjects (employee) {
    return employee.projects.map(function (project) {
        return {
            date: dateFormatter(project.startDate),
            name: project.name
        };
    });
}

function filteringEmployeeByDate(employees) {
    var startDate = arguments[1];
    var endDate = arguments[2] || arguments[1];
    employees.forEach(function (item) {
        item.projects = item.projects.filter(function (project) {
            if (project.endDate) {
                return project.startDate.getTime() <= startDate.getTime() && project.endDate.getTime() >= endDate.getTime();
            } else {
                project.startDate.getTime() <= startDate.getTime();
            }

        });
    });
}

function dateFormatter (date) {
    return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear() ;
}

module.exports = documentCtrl;