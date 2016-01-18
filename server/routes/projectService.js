var log = require('./../utils/log')(module);
var ProjectModel = require('./../models/project').ProjectModel;
var ProjectTechnologyModel = require('./../models/projectTech').ProjectTechnologyModel;
var ProjectSubTechModel = require('./../models/projectTech').ProjectSubTechModel;
var projectService = {};

projectService.getAll = function (req, res) {
    return ProjectModel.find().populate('tech').exec(function (err, projects) {
        populateProject(err, projects, res);
    });
}

projectService.get = function (req, res) {
    return ProjectModel.findById(req.params.id).populate('tech').exec(function (err, projects) {
        populateProject(err, projects, res);
    });
}

function populateProject(err, projects, res) {
    if (!err) {
        ProjectTechnologyModel.populate(projects, {
            path: 'tech.subTech',
            model: 'ProjectSubTech'
        }, function (err, projects) {
            return res.send(projects);
        });
    } else {
        return next(err);
    }
}

projectService.update = function () {

}

projectService.add = function (req, res) {
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

projectService.remove = function (req, res) {
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

projectService.uploadImages = function (req, res) {
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

module.exports = projectService;
