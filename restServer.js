const express = require('express'),
    app = express(),
    port = process.env.PORT || 4000,
    mongoose = require('mongoose'),
    Register = require('./api/models/registerListModel'), //created model loading here
    bodyParser = require('body-parser');

let querystring = require('querystring');
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
let http = require('http');
let request = require('request');



// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

// 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Route from the client to add a new user and creates the values to POST into blockchain core server
 */
app.post('/api/addUser', function (req, res) {
    console.log(req.body.username);
    let hashname = genUsernameHash(req.body.username);

    let data = {
        "username": hashname
    };
    console.log("User name = " + data);

    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: 'http://localhost:8090/',
        form: data

    }, function (error, response, body) {
        console.log(body);
    });
});

// model to store data into database
let routes = require('./api/routes/registerListRoutes'); //importing route
routes(app); //register the route

// Server port
app.listen(port);
// welcome display
console.log('RESTful API server started on: ' + port);


/**
 * Generates a SHA-256 hash from the name user
 * @param {string} value 
 */
function genUsernameHash(value) {
    hash.update(value);
    return hash.digest('hex');
}