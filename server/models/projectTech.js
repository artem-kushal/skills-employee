var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectTechnology = new Schema({
    techName: { type: String, required: true },
    techId: String,
    subTech: [{
        name: { type: String, required: true },
        subTechId: String,
    }],
    project: { type: Schema.Types.ObjectId, ref: 'Project' }
});

module.exports.ProjectTechnologyModel = mongoose.model('ProjectTechnology', ProjectTechnology);
