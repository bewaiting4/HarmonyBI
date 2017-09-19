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

    modelData: {
        type: Object
    }
});

FilterSchema.pre('validate', function (next) {

    this.create_date = new Date().toISOString();

    next();
})

module.exports = mongoose.model('filter', FilterSchema);
