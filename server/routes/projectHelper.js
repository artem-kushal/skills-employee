var log = require('./../utils/log')(module);
var ProjectModel = require('./../models/project').ProjectModel;
var ProjectTechnologyModel = require('./../models/projectTech').ProjectTechnologyModel;
var ProjectSubTechModel = require('./../models/projectTech').ProjectSubTechModel;
var projectService = require('./../services/projectService');
var projectHelper = {};

projectHelper.getAll = function (req, res) {
    projectService.getAll().then(function (projects) {
        return projectService.populate(projects);
    }).then(function (projects) {
        return res.send(projects);
    }).catch(function (err) {
        return next(err);
    });
}

projectHelper.get = function (req, res) {
    projectService.get(req.params.id).then(function (project) {
        return projectService.populate(project);
    }).then(function (project) {
        return res.send(project);
    }).catch(function (err) {
        return next(err);
    });
}

projectHelper.update = function () {

}
projectHelper.add = function (req, res) {
    var project = new ProjectModel({
        name: req.body.newProject.name,
        description: req.body.newProject.description,
        responsibilities: req.body.newProject.responsibilities,
        roles: req.body.newProject.roles,
        dateEnd: req.body.newProject.dateEnd
    });
    var projectTech = [];
    var projectSubTech = [];
    var addProjectTech = req.body.newProject.tech;
    for (var i = 0; i < addProjectTech.length; i++) {
        projectTech.push(new ProjectTechnologyModel({
            techName: req.body.newProject.tech[i].techName,
            project: project._id
        }));
        project.tech.push(projectTech[projectTech.length - 1]._id);// add tech in project
        for (var j = 0; j < addProjectTech[i].subTech.length; j++) {
            projectSubTech.push(new ProjectSubTechModel({
                name: addProjectTech[i].subTech[j].name,
                technology: projectTech[projectTech.length - 1]._id,
                project: project._id
            }));
            projectTech[projectTech.length - 1].subTech.push(projectSubTech[projectSubTech.length - 1]._id);// add subtech in project
        }
    }
    Promise.all(projectTech.map(projectService.saveTech)).then(function (results) {
        return Promise.all(projectSubTech.map(projectService.saveSubTech));
    }).then(function (results) {
        return projectService.save(project);
    }).then(function (project) {
        log.info('project created');
        return res.send({ project : project });
    }).catch(function (err) {
        return next(err);
    });
}

projectHelper.remove = function (req, res) {
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
        return projectService.getSubTechs(projectId);
    }).then(function (subtechs) {
        return Promise.all(subtechs.map(projectService.removeSubTech));
    }).then(function (removedSubtechs) {
        log.info('project removed');
        return res.send({ status: 'OK' });
    }).catch(function (err) {
        return next(err);
    });
}

projectHelper.uploadImages = function (req, res) {
    projectService.get(req.body.id).then(function (project) {
        if (!project) {
            return next(404);
        }
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
