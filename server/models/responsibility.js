var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var Responsibility = new Schema({
    name: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now }
});

module.exports.ResponsibilityModel = mongoose.model('Responsibility', Responsibility);
