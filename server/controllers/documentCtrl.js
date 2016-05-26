var log = require('./../utils/log')(module);
var employeeService = require('../data_layer/employeeService');
var fs = require('fs');
var Docxtemplater = require('docxtemplater');

var documentCtrl = {};

documentCtrl.getEmploymentReport = function (req, res, next) {
    if (!req.query.startDate || !req.query.endDate) {
        next(err);
    }
    employeeService.getEmpoyeeByProjectDate().then(function (employees) {
        employees = filteringEmployeesByDate(employees, getDateFromString(req.query.startDate), getDateFromString(req.query.endDate));
        var file = createDocxFile('employmentReportTemplate.docx', 'employmentReport.docx', {
            "dateStart" : req.query.startDate,
            "dateEnd" : req.query.endDate,
            "employees" : getEmployeesInfo(employees)
        });
        return res.download(file);
    }).catch(function (err) {
        return next(err);
    });
};

documentCtrl.getHistoryProjectsReport = function (req, res, next) {
    if (!req.query.employeeId) {
        next(err);
    }
    employeeService.get(req.query.employeeId).then(function (employee) {
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
        var employeeFio = employee.firstname + ' ' + employee.lastname + ' ' + employee.patronymic;
        return employee.projects.map(function (project) {
            return {
                date: dateFormatter(project.startDate) + ((project.endDate) ? dateFormatter(project.endDate) : ''),
                fio: employeeFio,
                projectName: project.name
            }
        });
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

function filteringEmployeesByDate(employees, startDate, endDate) {
    return employees.filter(function (item) {
        item.projects = item.projects.filter(function (project) {
            if (project.endDate) {
                return project.startDate.getTime() >= startDate.getTime() && project.endDate.getTime() <= endDate.getTime();
            } else {
                return project.startDate.getTime() >= startDate.getTime();
            }
        });
        return item.projects.length > 0;
    });
}

function dateFormatter (date) {
    return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear() ;
}

function getDateFromString(date) {
    var datePart = date.split('/');
    return new Date(datePart[1] + '/' + datePart[0] + '/' + datePart[2]);
}

module.exports = documentCtrl;