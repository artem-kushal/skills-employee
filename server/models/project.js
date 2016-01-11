var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

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

module.exports.ProjectModel = mongoose.model('Project', Project);
