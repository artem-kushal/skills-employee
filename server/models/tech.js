var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var Technology = new Schema({
    techName: { type: String, required: true },
    subTech: [{ type: Schema.Types.ObjectId, ref: 'SubTech' }],
    modified: { type: Date, default: Date.now }
});

var SubTech = new Schema({
    name: { type: String, required: true },
    modified: { type: Date, default: Date.now },
    technology: {
        type: Schema.Types.ObjectId,
        ref: 'Technology',
        required: true
    }
});

var SubTechSorting = new Schema({
    techId: { type: Schema.Types.ObjectId, required: true} ,
    sortOrder: []
});

module.exports.TechnologyModel = mongoose.model('Technology', Technology);
module.exports.SubTechModel = mongoose.model('SubTech', SubTech);
module.exports.SubTechSortingModel = mongoose.model('SubTechSorting', SubTechSorting);
