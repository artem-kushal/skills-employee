var log = require('./../utils/log')(module);
var multer  = require('multer')
var upload = multer({ storage: multer.memoryStorage() })
var technology = require('./technologyService');
var subtech = require('./subtechService');
var projects = require('./projectService');
var responsibility = require('./responsibilityService');
var role = require('./roleService');

module.exports = function (app) {
    app.get('/technologies', technology.getAll);
    app.post('/technologies', technology.add);
    app.put('/technologies/:id', technology.update);
    app.delete('/technologies/:id', technology.remove);

    app.post('/subtech', subtech.add);
    app.put('/subtech/:id', subtech.update);
    app.delete('/subtech/:id', subtech.remove);

    app.get('/projects/', projects.getAll);
    app.get('/projects/:id', projects.get);
    app.post('/projects', projects.add);
    app.post('/upload', upload.array('files'), projects.uploadImages);
    app.delete('/projects/:id', projects.remove);

    app.get('/responsibilities', responsibility.getAll);
    app.post('/responsibilities', responsibility.add);
    app.delete('/responsibilities/:id', responsibility.remove);
    app.put('/responsibilities/:id', responsibility.update);

    app.get('/roles', role.getAll);
    app.post('/roles', role.add);
    app.delete('/roles/:id', role.remove);
    app.put('/roles/:id', role.add);
};
