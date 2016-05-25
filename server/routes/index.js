var log = require('./../utils/log')(module);
var multer  = require('multer')
var path = require('path');
var upload = multer({ storage: multer.memoryStorage() })
var technology = require('../controllers/technologyCtrl');
var subtech = require('../controllers/subtechCtrl');
var projects = require('../controllers/projectCtrl');
var responsibility = require('../controllers/responsibilityCtrl');
var role = require('../controllers/roleCtrl');
var employee = require('../controllers/employeeCtrl');
var docs = require('../controllers/documentCtrl');
var secDocs = require('../controllers/secDocumentCtrl');

module.exports = function (app) {

    app.get('/', function(req, res){
       res.sendFile(path.resolve(__dirname + '/../../client/app/index.html'));
    });

    app.get('/technologies', technology.getAll);
    app.post('/technologies', technology.add);
    app.put('/technologies/:id', technology.update);
    app.delete('/technologies/:id', technology.remove);

    app.get('/employees/', employee.getAll);
    app.get('/employee/:id', employee.get);
    app.post('/employee', employee.add);
    app.put('/employee/:id', employee.update);
    app.delete('/employee/:id', employee.remove);
    app.post('/employee/addproject/:id', employee.addProject);
    app.post('/employee/removeproject/:id', employee.removeProject);

    app.post('/subtech', subtech.add);
    app.put('/subtech/:id', subtech.update);
    app.delete('/subtech/:id', subtech.remove);

    app.get('/projects/', projects.getAll);
    app.get('/projects/:id', projects.get);
    app.post('/projects', projects.add);
    app.post('/upload', upload.array('files'), projects.uploadImages);
    app.delete('/projects/:id', projects.remove);
    app.put('/projects', projects.update);
    app.get('/projects/search/:searchString', projects.search);

    app.get('/responsibilities', responsibility.getAll);
    app.post('/responsibilities', responsibility.add);
    app.delete('/responsibilities/:id', responsibility.remove);
    app.put('/responsibilities/:id', responsibility.update);

    app.get('/roles', role.getAll);
    app.post('/roles', role.add);
    app.delete('/roles/:id', role.remove);
    app.put('/roles/:id', role.update);

    app.get('/bydate/pdf', docs.getByDatePdf);
    app.get('/history/pdf', docs.getHistoryProjectPdf);
    app.get('/report/bydate', secDocs.getEmploymentReport);
    app.get('/report/history', secDocs.getHistoryProjectsReport);
};
