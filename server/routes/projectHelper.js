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
    for (var i = 0; i < req.body.newProject.tech.length; i++) {
        var technology = new ProjectTechnologyModel({
            techName: req.body.newProject.tech[i].techName,
            project: project._id
        });
        project.tech.push(technology._id);
        var projSubTech = req.body.newProject.tech[i].subTech;
        for (var j = 0; j < projSubTech.length; j++) {
            var newSubTech = new ProjectSubTechModel({
                name: projSubTech[j].name,
                technology: technology._id
            });
            technology.subTech.push(newSubTech._id);
            newSubTech.save(function (err) {
                if (err) {
                    return next(err);
                }
            });
        }
        technology.save(function (err) {
            if (err) {
                return next(err);
            }
        });
    }
    project.save(function (err) {
        if (!err) {
            log.info('project created');
            return res.send({ project : project });
        } else {
            return next(err);
        }
    });
}

projectHelper.remove = function (req, res) {
    return ProjectModel.findById(req.params.id, function (err, project) {
        return project.remove(function (err) {
            if (!err){
                for (var i = 0; i < project.tech.length; i++) {
                    ProjectTechnologyModel.findById(project.tech[i], function (err, technology) {
                        if (!err){
                            for (var j = 0; j < technology.subTech.length; j++) {
                                ProjectSubTechModel.findById(technology.subTech[j], function (err, subtech) {
                                    return subtech.remove();
                                });
                            }
                        }
                        return technology.remove();
                    });
                }
                log.info('project removed');
                return res.send({ status: 'OK' });
            } else {
                return next(err);
            }
        });
    });
}

projectHelper.uploadImages = function (req, res) {
    ProjectModel.findById(req.body.id, function (err, project) {
        for (var i = 0; i < req.files.length; i++) {
            project.images.push({
                data: req.files[i].buffer.toString('base64'),
                contentType: req.files[i].mimetype
            });
        }
        project.save(function (err) {
            if (!err) {
                log.info('images uploaded');
                return res.send({ project : project });
            } else {
                return next(err);
            }
        });
    });
}

module.exports = projectHelper;
