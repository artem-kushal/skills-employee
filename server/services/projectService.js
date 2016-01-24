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
                resolve(project);
            }
        });
    });
}

projectService.saveTech = function (technology) {
    return new Promise(function (resolve, reject) {
        technology.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

projectService.getTechs = function (projectId) {
    return new Promise(function (resolve, reject) {
        ProjectTechnologyModel.find({ project : projectId }).exec(function (err, techs) {
            if (err) {
                reject(err);
            } else {
                resolve(techs);
            }
        });
    });
}

projectService.removeTech = function (tech) {
    return new Promise(function (resolve, reject) {
        tech.remove(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(tech);
            }
        });
    });
}

projectService.getSubTechs = function (projectId) {
    return new Promise(function (resolve, reject) {
        ProjectSubTechModel.find({ project : projectId }).exec(function (err, subTechs) {
            if (err) {
                reject(err);
            } else {
                resolve(subTechs);
            }
        });
    });
}

projectService.saveSubTech = function (subTech) {
    return new Promise(function (resolve, reject) {
        subTech.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(subTech);
            }
        });
    });
}

projectService.removeSubTech = function (subTech) {
    return new Promise(function (resolve, reject) {
        subTech.remove(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(subTech);
            }
        });
    });
}

module.exports = projectService;
