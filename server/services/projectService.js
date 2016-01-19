var ProjectModel = require('./../models/project').ProjectModel;
var ProjectTechnologyModel = require('./../models/projectTech').ProjectTechnologyModel;
var ProjectSubTechModel = require('./../models/projectTech').ProjectSubTechModel;
var projectService = {};

projectService.getAll = function () {
    return new Promise(function (resolve, reject) {
        ProjectModel.find().populate('tech').exec(function (err, projects) {
            if (err) {
                reject(err);
            } else {
                resolve(projects);
            }
        });
    });
}

projectService.get = function (id) {
    return new Promise(function (resolve, reject) {
        ProjectModel.findById(id).populate('tech').exec(function (err, project) {
            if (err) {
                reject(err);
            } else {
                resolve(project);
            }
        });
    });
}

projectService.populate = function (projects) {
    return new Promise(function (resolve, reject) {
        ProjectTechnologyModel.populate(projects, {
            path: 'tech.subTech',
            model: 'ProjectSubTech'
        }, function (err, projects) {
            if (err) {
                reject(err);
            } else {
                resolve(projects);
            }
        });
    });
}

projectService.save = function (project) {
    return new Promise(function (resolve, reject) {
        project.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(project);
            }
        });
    });
}

projectService.remove = function (project) {
    return new Promise(function (resolve, reject) {
        project.remove(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = projectService;
