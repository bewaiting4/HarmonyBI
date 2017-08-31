var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition.
var FilterSchema = new Schema({
    
    name: {
        type: String,
        required: true
    }

    create_date: {
        type: Date,
        required: true
    }

    date_from: {
        type: Date
    },

    date_from: {
        type: Date
    },

    lat: {
        type: String
    },

    long: {
        type: String
    },

    radius: {
        type: String
    },

    ci_from: {
        type: Array
    },

    ci_to: {
        type: Array
    },

    district: {
        type: Array
    },

    idigit: {
        type: Array
    },

    number: {
        type: Array
    }


});

module.exports = mongoose.model('filter', FilterSchema);