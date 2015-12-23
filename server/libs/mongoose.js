var mongoose = require('mongoose');
var log = require('./log')(module);
var config = require('./config');

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

// Schemas

var SubTech = new Schema({
    name: String,
    modified: { type: Date, default: Date.now },
    technology: { type: Schema.Types.ObjectId, ref: 'Technology' }
});

var Technology = new Schema({
    techName: String,
    subTech: [{ type: Schema.Types.ObjectId, ref: 'SubTech' }],
    modified: { type: Date, default: Date.now }
});

var ProjectSubTech = new Schema({
    name: String,
    subTechId: String, 
    technology: { type: Schema.Types.ObjectId, ref: 'ProjectTechnology' }
});

var ProjectTechnology = new Schema({
    techName: String,
    techId: String,
    subTech: [{ type: Schema.Types.ObjectId, ref: 'ProjectSubTech' }],
    project: { type: Schema.Types.ObjectId, ref: 'Project' }
});


var Project = new Schema({
	name: String,
	description: String,
	tech: [{ type: Schema.Types.ObjectId, ref: 'ProjectTechnology' }],
	responsibility: String,
	dateCreated: { type: Date, default: Date.now }
});

var TechnologyModel = mongoose.model('Technology', Technology);
var SubTechModel = mongoose.model('SubTech', SubTech);
var ProjectTechnologyModel = mongoose.model('ProjectTechnology', ProjectTechnology);
var ProjectSubTechModel = mongoose.model('ProjectSubTech', ProjectSubTech);
var ProjectModel = mongoose.model('Project', Project);

module.exports.TechnologyModel = TechnologyModel;
module.exports.SubTechModel = SubTechModel;
module.exports.ProjectTechnologyModel = ProjectTechnologyModel;
module.exports.ProjectSubTechModel = ProjectSubTechModel;
module.exports.ProjectModel = ProjectModel;
// validation
// Article.path('title').validate(function (v) {
//     return v.length > 5 && v.length < 70;
// });