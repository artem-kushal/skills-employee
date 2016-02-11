var log = require('./../utils/log')(module);
var ProjectModel = require('./../models/project').ProjectModel;
var ProjectTechnologyModel = require('./../models/projectTech').ProjectTechnologyModel;
var projectService = require('./../services/projectService');
var projectHelper = {};

projectHelper.getAll = function (req, res, next) {
    projectService.getAll().then(function (projects) {
        return res.send(projects);
    }).catch(function (err) {
        return next(err);
    });
}

projectHelper.get = function (req, res, next) {
    projectService.get(req.params.id).then(function (project) {
        return res.send(project);
    }).catch(function (err) {
        return next(err);
    });
}

projectHelper.update = function (req, res, next) {
    var projectId = req.body.newProject._id;
    var projectTech = [];
    projectService.get(projectId).then(function (project) {
        if (!project) {
            return next(404);
        }
        project.name = req.body.newProject.name;
        project.description = req.body.newProject.description;
        project.responsibilities = req.body.newProject.responsibilities;
        project.roles = req.body.newProject.roles;
        project.dateEnd = req.body.newProject.dateEnd;
        var addProjectTech = req.body.newProject.tech;
        for (var i = 0; i < addProjectTech.length; i++) {
            projectTech.push(new ProjectTechnologyModel({
                techName: req.body.newProject.tech[i].techName,
                project: project._id,
                techId: req.body.newProject.tech[i].techId
            }));
            project.tech.push(projectTech[projectTech.length - 1]._id);// add tech in project
            for (var j = 0; j < addProjectTech[i].subTech.length; j++) {
                projectTech[projectTech.length - 1].subTech.push({// add subtech in project
                    name: addProjectTech[i].subTech[j].name,
                    subTechId: addProjectTech[i].subTech[j].subTechId
                });
            }
        }
        return projectService.save(project);
    }).then(function (project) {
        return projectService.getTechs(projectId);
    }).then(function (techs) {
        return Promise.all(techs.map(projectService.removeTech));
    }).then(function (removedTechs) {
        return Promise.all(projectTech.map(projectService.saveTech));
    }).then(function () {
        log.info('project updated');
        return res.send({ status: 'OK' });
    }).catch(function (err) {
        return next(err);
    });

}
projectHelper.add = function (req, res, next) {
    var project = new ProjectModel({
        name: req.body.newProject.name,
        description: req.body.newProject.description,
        responsibilities: req.body.newProject.responsibilities,
        roles: req.body.newProject.roles,
        dateEnd: req.body.newProject.dateEnd
    });
    var projectTech = [];
    var addProjectTech = req.body.newProject.tech;
    for (var i = 0; i < addProjectTech.length; i++) {
        projectTech.push(new ProjectTechnologyModel({
            techName: req.body.newProject.tech[i].techName,
            project: project._id,
            techId: req.body.newProject.tech[i].techId
        }));
        project.tech.push(projectTech[projectTech.length - 1]._id);// add tech in project
        for (var j = 0; j < addProjectTech[i].subTech.length; j++) {
            projectTech[projectTech.length - 1].subTech.push({// add subtech in project
                name: addProjectTech[i].subTech[j].name,
                subTechId: addProjectTech[i].subTech[j]._id
            });
        }
    }
    Promise.all(projectTech.map(projectService.saveTech)).then(function (results) {
        return projectService.save(project);
    }).then(function (project) {
        log.info('project created');
        return res.send({ project : project });
    }).catch(function (err) {
        return next(err);
    });
}

projectHelper.remove = function (req, res, next) {
    var projectId = req.params.id;
    projectService.get(projectId).then(function (project) {
        if (!project) {
            return next(404);
        }
        return projectService.remove(project);
    }).then(function (project) {
        return projectService.getTechs(projectId);
    }).then(function (techs) {
        return Promise.all(techs.map(projectService.removeTech));
    }).then(function (removedTechs) {
        log.info('project removed');
        return res.send({ status: 'OK' });
    }).catch(function (err) {
        return next(err);
    });
}

projectHelper.uploadImages = function (req, res, next) {
    projectService.get(req.body.id).then(function (project) {
        if (!project) {
            return next(404);
        }
        project.images = [];
        for (var i = 0; i < req.files.length; i++) {
            project.images.push({
                data: req.files[i].buffer.toString('base64'),
                contentType: req.files[i].mimetype
            });
        }
        return projectService.save(project);
    }).then(function (project) {
        log.info('images uploaded');
        return res.send({ project : project });
    }).catch(function (err) {
        return next(err);
    });
}

module.exports = projectHelper;
