var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// Schema definition.
var UserSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },

    // Don't store the password as plain text.
    password: {
        type: String,
        required: false
    },

    name: {
        type: String,
        required: false
    },

    admin: {
        type: Boolean,
        required: false
    }
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = this.encryptPassword(this.password);

    next();
})


UserSchema.methods = {
    // Check the passwords on login.
    authenticate: function(plainTextPword) {
        return bcrypt.compareSync(plainTextPword, this.password);
    },
    // Hash the passwords
    encryptPassword: function(plainTextPword) {
        var salt = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(plainTextPword, salt);
    }
};

module.exports = mongoose.model('user', UserSchema);