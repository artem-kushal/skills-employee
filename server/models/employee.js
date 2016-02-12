var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Employee = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    patronymic: { type: String, required: true },
    birthday: { type: String },
    department: { type: String, required: true },
    group: { type: String },
    room: { type: String, required: true },
    dateEmployment: { type: String },
    projects: [{
        projId: { type: String },
        name: { type: String }
    }],
    technologies: [{
        tech: { type: Schema.Types.ObjectId, ref: 'Technology' },
        subTech: [{ type: Schema.Types.ObjectId, ref: 'SubTech' }]
    }]
});


module.exports = mongoose.model('Employee', Employee);
