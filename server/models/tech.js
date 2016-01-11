var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var Technology = new Schema({
    techName: String,
    subTech: [{ type: Schema.Types.ObjectId, ref: 'SubTech' }],
    modified: { type: Date, default: Date.now }
});

var SubTech = new Schema({
    name: String,
    modified: { type: Date, default: Date.now },
    technology: { type: Schema.Types.ObjectId, ref: 'Technology' }
});

module.exports.TechnologyModel = mongoose.model('Technology', Technology);
module.exports.SubTechModel = mongoose.model('SubTech', SubTech);
