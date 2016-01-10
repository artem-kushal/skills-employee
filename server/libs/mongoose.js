var mongoose = require('mongoose');
var log = require('./log')(module);
var config = require('./config');

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback() {
    log.info('Connected to DB!');
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
    roles: [{ name: String, count: Number }],
    responsibilities: [{ name: String, responsibId: String }],
    dateEnd: { type: String },
    images: [{ data: String, contentType: String }],
    dateCreated: { type: Date, default: Date.now }
});

var Responsibility = new Schema({
    name: String,
    dateCreated: { type: Date, default: Date.now }
});

var Role = new Schema({
    name: String,
    dateCreated: { type: Date, default: Date.now }
});

var Img = new Schema({
    img: { data: Buffer, contentType: String }
});

var TechnologyModel = mongoose.model('Technology', Technology);
var SubTechModel = mongoose.model('SubTech', SubTech);
var ProjectTechnologyModel = mongoose.model('ProjectTechnology', ProjectTechnology);
var ProjectSubTechModel = mongoose.model('ProjectSubTech', ProjectSubTech);
var ProjectModel = mongoose.model('Project', Project);
var ResponsibilityModel = mongoose.model('Responsibility', Responsibility);
var RoleModel = mongoose.model('Role', Role);
var ImgModel = mongoose.model('Img', Img);

module.exports.TechnologyModel = TechnologyModel;
module.exports.SubTechModel = SubTechModel;
module.exports.ProjectTechnologyModel = ProjectTechnologyModel;
module.exports.ProjectSubTechModel = ProjectSubTechModel;
module.exports.ProjectModel = ProjectModel;
module.exports.ResponsibilityModel = ResponsibilityModel;
module.exports.RoleModel = RoleModel;
module.exports.ImgModel = ImgModel;
// validation
// Article.path('title').validate(function (v) {
//     return v.length > 5 && v.length < 70;
// });
