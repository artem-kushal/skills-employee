var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
    name: { type: String, required: true },
    description: String,
    tech: [{
        type: Schema.Types.ObjectId,
        ref: 'ProjectTechnology'
    }],
    roles: [{
        roleId: Schema.Types.ObjectId,
        name: String,
        count: Number,
        addingCount: {type: Number, default: 0}
}],
    responsibilities: [{
        name: String,
        responsibId: String
    }],
    dateEnd: { type: String },
    images: [{ data: String, contentType: String }],
    dateCreated: { type: Date, default: Date.now }
});

Project.path('tech').validate(function (tech) {
    if (!tech){
        return false;
    } else if (tech.length === 0){
        return false;
    }
    return true;
}, 'Project needs to have at least one technology');

Project.path('roles').validate(function (roles) {
    if (!roles){
        return false;
    } else if (roles.length === 0){
        return false;
    }
    return true;
}, 'Project needs to have at least one role');

Project.path('responsibilities').validate(function (responsibilities) {
    if (!responsibilities){
        return false;
    } else if (responsibilities.length === 0){
        return false;
    }
    return true;
}, 'Project needs to have at least one responsibility');

module.exports.ProjectModel = mongoose.model('Project', Project);
