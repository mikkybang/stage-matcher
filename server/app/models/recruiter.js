// load the things we need
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
const recruiterSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String
    },

});

// generating a hash
recruiterSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
recruiterSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('recruiterUser', recruiterSchema);
