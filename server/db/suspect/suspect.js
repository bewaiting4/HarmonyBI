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

    // Should be one of EnumSuspectType
    type: {
        type: Number
    }
});

/**
 * @deprecated since suspects is part of filter now.
 */
module.exports = mongoose.model('suspect', SuspectSchema);
