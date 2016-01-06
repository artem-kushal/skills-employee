var express = require('express');
var log = require('./libs/log')(module);
var fs = require('fs');
var config = require('./libs/config');
var mongo = require('mongodb');
var bodyParser = require('body-parser')
var app = express();
var TechnologyModel = require('./libs/mongoose').TechnologyModel;
var SubTechModel = require('./libs/mongoose').SubTechModel;
var ProjectTechnologyModel = require('./libs/mongoose').ProjectTechnologyModel;
var ProjectSubTechModel = require('./libs/mongoose').ProjectSubTechModel;
var ProjectModel = require('./libs/mongoose').ProjectModel;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// app.use(express.methodOverride()); // поддержка put и delete
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


app.get('/technologies', function (req, res) {
    return TechnologyModel.find().populate('subTech').exec(function (err, technologies) {
        if (!err) {
            return res.send(technologies);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.post('/technologies', function (req, res) {
    var technology = new TechnologyModel({
        techName: req.body.techName
    });

    technology.save(function (err) {
        if (!err) {
            log.info('technology created');
            return res.send({ technology : technology });
        } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
            log.error('Internal error(%d): %s', res.statusCode, err.message);
        }
    });
});

app.put('/technologies/:id', function (req, res) {
    return TechnologyModel.findById(req.params.id, function (err, technology) {
        if (!technology) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        technology.techName = req.body.techName;
        technology.modified = Date.now();
        return technology.save(function (err) {
            if (!err) {
                log.info('technology updated');
                return res.send({ technology: technology });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    });
});

app.delete('/technologies/:id', function (req, res) {
    return TechnologyModel.findById(req.params.id, function (err, technology) {
        return technology.remove(function (err) {
            if (!err){
                for (var i = 0; i < technology.subTech.length;i++) {
                    SubTechModel.findById(technology.subTech[i], function (err, subtech) {
                        return subtech.remove(function (err) {
                            if (err){
                                res.statusCode = 500;
                                res.send({ error: 'Server error' });
                                log.error('Internal error(%d): %s', res.statusCode, err.message);
                            }
                        });
                    });
                }
                log.info('technology removed');
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    });
});

app.post('/subtech', function (req, res) {
    TechnologyModel.findById(req.body.parentId, function (err, technology) {
        if (!technology) {
            res.statusCode = 404;
            return res.send({ error: 'Parent technology not found' });
        }
        var newSubTech = new SubTechModel({
            name: req.body.name,
            technology: req.body.parentId
        });
        technology.subTech.push(newSubTech._id);
        return technology.save(function (err) {
            if (!err) {
                log.info('technology updated');
                newSubTech.save(function (err) {
                    if (!err) {
                        log.info('subtech created');
                        return res.send({ newSubTech : newSubTech });
                    } else {
                        res.statusCode = 500;
                        res.send({ error: 'Server error' });
                        log.error('Internal error(%d): %s', res.statusCode, err.message);
                    }
                });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    });
});

app.put('/subtech/:id', function (req, res) {
    return SubTechModel.findById(req.params.id, function (err, subtech) {
        if (!subtech) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        subtech.name = req.body.name;
        subtech.modified = Date.now();
        return subtech.save(function (err) {
            if (!err) {
                log.info('subtech updated');
                return res.send({ subtech: subtech });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    });
});

app.delete('/subtech/:id', function (req, res) {
    return SubTechModel.findById(req.params.id, function (err, subtech) {
        return subtech.remove(function (err) {
            if (!err){
                TechnologyModel.update({ _id: subtech.technology }, { $pull : { subTech : subtech._id }}, function (err, numberAffected) {
                    if (!err){
                        log.info('removed subtech id in technology');
                    } else {
                        res.statusCode = 500;
                        res.send({ error: 'Server error' });
                        log.error('Internal error(%d): %s', res.statusCode, err.message);
                    }
                });
                log.info('subtech removed');
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    });
});

app.get('/projects/', function (req, res) {
    return ProjectModel.find().populate('tech').exec(function (err, projects) {
        populateProject(err, projects, res);
    });
});

app.get('/projects/:id', function (req, res) {
    return ProjectModel.findById(req.params.id).populate('tech').exec(function (err, projects) {
        populateProject(err, projects, res);
    });
});

function populateProject(err, projects, res) {
    if (!err) {
        ProjectTechnologyModel.populate(projects, {
            path: 'tech.subTech',
            model: 'ProjectSubTech'
        },
          function (err, projects) {
              return res.send(projects);
          });
    } else {
        res.statusCode = 500;
        log.error('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
    }
}

app.post('/projects', function (req, res) {
    var project = new ProjectModel({
        name: req.body.newProject.name,
        description: req.body.newProject.description,
        responsibility: req.body.newProject.responsibility
    });
    for (var i = 0; i < req.body.newProject.tech.length; i++) {
        var technology = new ProjectTechnologyModel({
            techName: req.body.newProject.tech[i].techName,
            project: project._id
        });
        project.tech.push(technology._id);
        var projSubTech = req.body.newProject.tech[i].subTech;
        for (var i = 0; i < projSubTech.length; i++) {
            var newSubTech = new ProjectSubTechModel({
                name: projSubTech[i].name,
                technology: technology._id
            });
            technology.subTech.push(newSubTech._id);
            newSubTech.save(function (err) {
                if (err) {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                    log.error('Internal error(%d): %s', res.statusCode, err.message);
                }
            });
        }
        technology.save(function (err) {
            if (err) {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    }
    project.save(function (err) {
        if (!err) {
            log.info('project created');
            return res.send({ project : project });
        } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
            log.error('Internal error(%d): %s', res.statusCode, err.message);
        }
    });
});

var server = app.listen(config.get('port'), function () {
    log.info('Express server listening on port ' + config.get('port'));
})
