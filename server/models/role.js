var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var Role = new Schema({
    name: { type: String, required: true },
    technologies: [],
    dateCreated: { type: Date, default: Date.now }
});

Role.path('technologies').validate(function (tech) {
    if (!tech){
        return false;
    } else if (tech.length === 0){
        return false;
    }
    return true;
}, 'Role needs to have at least one technology');

module.exports.RoleModel = mongoose.model('Role', Role);
