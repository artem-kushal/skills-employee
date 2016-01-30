var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var Role = new Schema({
    name: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now }
});

module.exports.RoleModel = mongoose.model('Role', Role);
