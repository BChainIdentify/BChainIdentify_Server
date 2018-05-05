'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;



const RegisterSchema = new Schema({
    username: {
        type: String,
        required: 'Enter the username'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['active', 'inactive']
        }],
        default: ['active']
    }
});

module.exports = mongoose.model('Register', RegisterSchema);