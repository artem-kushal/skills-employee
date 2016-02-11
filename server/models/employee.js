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
    dateEmployment: { type: String }
});


module.exports = mongoose.model('Employee', Employee);
