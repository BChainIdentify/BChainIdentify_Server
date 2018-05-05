'use strict';

const crypto = require('crypto');
const hash = crypto.createHash('sha256');


let mongoose = require('mongoose'),
    Register = mongoose.model('Register');

exports.list_all_register = function (req, res) {
    Register.find({}, function (err, register) {
        if (err)
            res.send(err);
        res.json(register);
    });
};


exports.create_a_register = function (req, res) {
    let new_register = new Register(req.body);
    new_register.save(function (err, register) {
        console.log(genUsernameHash(new_register.username));
        if (err)
            res.send(err);
        res.json(register);
    });
};


exports.read_a_register = function (req, res) {
    Register.findById(req.params.registerId, function (err, register) {
        if (err)
            res.send(err);
        res.json(register);
    });
};


exports.update_a_register = function (req, res) {
    Register.findOneAndUpdate({ _id: req.params.registerId }, req.body, { new: true }, function (err, register) {
        if (err)
            res.send(err);
        res.json(register);
    });
};


exports.delete_a_register = function (req, res) {
    Register.remove({
        _id: req.params.registerId
    }, function (err, register) {
        if (err)
            res.send(err);
        res.json({ message: 'Register successfully deleted' });
    });
};

/**
 * Generates a SHA-256 hash from the name user
 * @param {*} value 
 */
function genUsernameHash(value) {
    let hashHex = hash.update(value);
    return hash.digest('hex');
}