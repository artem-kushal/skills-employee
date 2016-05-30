var roleService = require('../data_layer/roleService');
var employeeHelper = {};

employeeHelper.addProject = function (employee, addingProject, projectDate) {
    return new Promise(function (resolve, reject) {
        roleService.get(employee.role).then(function (role) {

            if (!checkProjectConsist(employee, addingProject._id)) {
                console.log(projectDate);
                var endDate = (projectDate.endDate) ? getNewDate(projectDate.endDate) : undefined;
                employee.projects.push({
                    projId: addingProject._id,
                    name: addingProject.name,
                    startDate: getNewDate(projectDate.startDate),
                    endDate: endDate
                });
                addProjectTechInEmployee(employee, addingProject, role.technologies);
            }

            resolve(employee);
        }).catch(function (err) {
            reject(err);
        });
    });
}

employeeHelper.removeProject = function (employee, projectsEmployee, removeProject) {
    return new Promise(function (resolve, reject) {
        roleService.get(employee.role).then(function (role) {

            employee.technologies = [];
            for (var i = 0; i < projectsEmployee.length; i++) {
                addProjectTechInEmployee(employee, projectsEmployee[i], role.technologies);
            }

            resolve(employee);
        }).catch(function (err) {
            reject(err);
        });
    });
}

function checkProjectConsist(employee, id) {
    for (var i = 0; i < employee.projects.length; i++) {
        if (employee.projects[i].projId === id) {
            return true;
        }
    }
    return false;
}

function addProjectTechInEmployee(employee, addingProject, roleTech) {
    for (var i = 0; i < addingProject.tech.length; i++) {
        if (roleTech.indexOf(addingProject.tech[i].techId) !== -1) {
            var employeeTech = getTechFromEmployee(employee, addingProject.tech[i].techId);
            if (employeeTech) {
                for (var j = 0; j < addingProject.tech[i].subTech.length; j++) {
                    addSubTechInEmployee(employeeTech, addingProject.tech[i].subTech[j].subTechId);
                }
            } else { // если технологии нет то добавляем ее и подтехнологии сотруднику
                employee.technologies.push({ tech: addingProject.tech[i].techId, subTech: [] });
                var lastIndex = employee.technologies.length - 1;
                for (var j = 0; j < addingProject.tech[i].subTech.length; j++) {
                    employee.technologies[lastIndex].subTech.push(addingProject.tech[i].subTech[j].subTechId);
                }
            }
        }
    }
}

function getTechFromEmployee(employee, id) {

    for (var i = 0; i < employee.technologies.length; i++) {
        if (employee.technologies[i].tech.equals(id)) {
            return employee.technologies[i];
        }
    }
    return undefined;
}

function addSubTechInEmployee(emplyeeTech, id) {
    var isEqual = false;
    for (var i = 0; i < emplyeeTech.subTech.length; i++) {
        if (emplyeeTech.subTech[i].equals(id)) {
            isEqual = true;
        }
    }
    if (!isEqual) {
        emplyeeTech.subTech.push(id);
    }
}

function getNewDate(date) {
    var datePart = date.split('/');
    return new Date(datePart[1] + '/' + datePart[0] + '/' + datePart[2]);
}

module.exports = employeeHelper;
