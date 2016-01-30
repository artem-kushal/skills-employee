var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var ProjectTechnology = new Schema({
    techName: { type: String, required: true },
    techId: String,
    subTech: [{ type: Schema.Types.ObjectId, ref: 'ProjectSubTech' }],
    project: { type: Schema.Types.ObjectId, ref: 'Project' }
});

var ProjectSubTech = new Schema({
    name: { type: String, required: true },
    subTechId: String,
    technology: {
        type: Schema.Types.ObjectId,
        ref: 'ProjectTechnology',
        required: true
    },
    project: { type: Schema.Types.ObjectId }
});

module.exports.ProjectTechnologyModel = mongoose.model('ProjectTechnology', ProjectTechnology);
module.exports.ProjectSubTechModel = mongoose.model('ProjectSubTech', ProjectSubTech);
