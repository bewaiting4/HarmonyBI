var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition.
var FilterSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    create_date: {
        type: Date,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

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
        type: String
    },

    ci_to: {
        type: String
    },

    district: {
        type: String
    },

    idigit: {
        type: String
    },

    number: {
        type: String
    }
});

FilterSchema.pre('validate', function(next) {

    this.create_date = new Date().toISOString();

    next();
})

module.exports = mongoose.model('filter', FilterSchema);