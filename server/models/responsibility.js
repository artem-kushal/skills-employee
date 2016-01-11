var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var Responsibility = new Schema({
    name: String,
    dateCreated: { type: Date, default: Date.now }
});

module.exports.ResponsibilityModel = mongoose.model('Responsibility', Responsibility);
