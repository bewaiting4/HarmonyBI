var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EnumSuspectType = require('./enumSuspectType');

// Schema definition.
var SuspectSchema = new Schema({
    number: {
        type: String,
        required: true,
        unique: true
    },

    idigit: {
        type: String
    },

    name: {
        type: String
    },

    type: {
        type: Number
    }
});

module.exports = mongoose.model('suspect', SuspectSchema);