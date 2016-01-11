var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var ProjectTechnology = new Schema({
    techName: String,
    techId: String,
    subTech: [{ type: Schema.Types.ObjectId, ref: 'ProjectSubTech' }],
    project: { type: Schema.Types.ObjectId, ref: 'Project' }
});

var ProjectSubTech = new Schema({
    name: String,
    subTechId: String,
    technology: { type: Schema.Types.ObjectId, ref: 'ProjectTechnology' }
});

module.exports.ProjectTechnologyModel = mongoose.model('ProjectTechnology', ProjectTechnology);
module.exports.ProjectSubTechModel = mongoose.model('ProjectSubTech', ProjectSubTech);
