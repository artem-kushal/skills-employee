var ProjectModel = require('./../models/project').ProjectModel;
var ProjectTechnologyModel = require('./../models/projectTech').ProjectTechnologyModel;
var projectService = {};

projectService.getBriefAll = function () {
    return ProjectModel.find({}, 'name').exec();
};

projectService.getProjectsByRole = function (roleId) {
    return ProjectModel.find({'roles.roleId': {"$in": roleId}}).populate('tech').exec();
};

projectService.updateProjectRole = function (projectId ,roleId) {
    console.log(projectId ,roleId);
    return ProjectModel.findByIdAndUpdate(projectId, {'roles.roleId': ObjectId(roleId.toString())}, {'$set': {
        'roles.$.addingCount': 2}
    }).exec();
};

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

projectService.getEmployeeProject = function (projectsId) {
    return new Promise(function (resolve, reject) {
        ProjectModel.find({ _id : { $in: projectsId }}, 'tech').populate('tech').exec(function (err, project) {
            if (err) {
                reject(err);
            } else {
                resolve(project);
            }
        });
    });
}

projectService.find = function (searchString) {
    return new Promise(function (resolve, reject) {
        ProjectModel.find({ name: new RegExp('.*' + searchString + '.*') }).populate('tech').exec(function (err, projects) {
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

module.exports = projectService;
