var log = require('./../utils/log')(module);
var employeeService = require('../data_layer/employeeService');
var fs = require('fs');
var Docxtemplater = require('docxtemplater');
var roleService = require('../data_layer/roleService');
var projectService = require('../data_layer/projectService');

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

    var employee = undefined;
    var roleTech = [];
    employeeService.get(req.query.employeeId).then(function (resEmployee) {
        employee = resEmployee;
        return roleService.get(employee.role);
    }).then(function (role) {
        roleTech = role.technologies;
        var projIds = employee.projects.map(function (project) {
            return project.projId;
        });
        return projectService.getEmployeeProject(projIds)
    }).then(function (employeeProject) {
        var file = createDocxFile('historyReportTemplate.docx', 'historyReport.docx', {
            "fio" : employee.firstname + ' ' + employee.lastname + ' ' + employee.patronymic,
            "projects" : getEmployeeProjects(employee, employeeProject, roleTech)
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

function getEmployeeProjects (employee, employeesProject, roleTech) {
    return employee.projects.map(function (project) {
        var emplProject = employeesProject.find(function (eProj) {
            return eProj._id == project.projId;
        });
        return {
            date: dateFormatter(project.startDate),
            name: project.name,
            tech: getRoleTech(emplProject.tech, roleTech)
        };
    });
}

function getRoleTech (projTechs, roleTech) {
    var subtechs = [];
    projTechs.forEach(function(projTech) {
        if (roleTech.indexOf(projTech.techId) !== -1) {
            projTech.subTech.map(function(projSubtech) {
                subtechs.push(projSubtech.name);
            });
        }
    });
    return subtechs.join(', ');
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