const express = require('express'),
    app = express(),
    port = process.env.PORT || 4000,
    mongoose = require('mongoose'),
    Register = require('./api/models/registerListModel'), //created model loading here
    bodyParser = require('body-parser');


let http = require('http');
let request = require('request');



// mongoose instance connection url connection
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/Tododb');

// 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Route from the client to add a new user and creates the values to POST into blockchain core server
 */
app.post('/api/addUser', function (req, res) {
    const pairKeys = require('./security/genPairKeys');
    let username = req.body.username;
    if (username != undefined) {
        let hashname = genUsernameHash(username);

        console.log(hashname);
        console.log("************************");
        let keyPair = pairKeys.generatePairKeys(hashname);


        let base64data = keyPair.signature.toString('base64');
        let data = {
            "usernameHash": hashname,
            "publicKey": keyPair.publicKey,
            "signedHash": base64data
        }

        console.log("User name = " + data);

        request.post({
            headers: { 'content-type': 'application/json' },
            url: 'http://localhost:3003/api/addUser',
            form: data

        }, function (error, response, body) {
            console.log(response);
            if (response.statusCode == 200) {
                res.send({ "publicKey": keyPair.publicKey, "blockchain": response.body });
            } else {
                res.sendStatus(500);
            }
        });
    }
});

app.post('/api/identify', function (req, res) {
    console.log(req.body);
    let username = req.body.username;
    let publicKey_client = req.body.publicKey;
    if ((username !== 'undefined') && publicKey_client !== 'undefined') {
        res.send(true);
    } else {
        res.send(false);
    }
    /*
    if ((req.body.publicKey).length == !0) {
        let username = req.body.username;
        let publicKey_client = req.body.publicKey;
    }
    console.log("No publicKey defined");
*/

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
    let hash = require('crypto').createHash('sha256').update(value).digest('hex');
    return hash;
}