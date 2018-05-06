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
mongoose.connect('mongodb://localhost:27017/Users');


// 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName:String,
    privateKey:String    
})

var userMongo = mongoose.model("userMongo",userSchema);

/**
 * Route from the client to add a new user and creates the values to POST into blockchain core server
 */
app.post('/api/addUser', function (req, res) {

    userMongo.findOne({ 'userName': req.body.username}, function (err, user) {
        if (err) return handleError(err);
        if(user != null){
            res.sendStatus(409)
            return
        }
        const pairKeys = require('./security/genPairKeys');

    let hashname = genUsernameHash(req.body.username);

    let keyPair = pairKeys.generatePairKeys(hashname);

    let base64data = keyPair.signature.toString('base64');
    let data = {
        "usernameHash": hashname,
        "publicKey": keyPair.publicKey,
        "signedHash": base64data
    }

    var saveUser =  new userMongo({
        userName : req.body.username,
        privateKey: keyPair.privateKey
    })

    request.post({
        headers: { 'content-type': 'application/json' },
        url: 'http://localhost:3003/api/addUser',
        form: data

    }, function (error, response, body) {
        //console.log(response);
        if (response.statusCode == 200) {
            //success save user in db
            saveUser.save(function(err){
                if (err){
                    console.error("error when saving user")
                }
                console.log("user saved")
            })
            res.send({ "publicKey": keyPair.publicKey, "blockchain": response.body });
        } else {
            res.sendStatus(500);
        }
    });
    });
});

app.post('/api/identify', function (req, res) {
    let username = req.body.username;
    let publicKey = req.body.pkey;
    //if ((username !== '' && username !== 'undefined' && username !== null) && (publicKey_client !== '' && publicKey_client !== 'undefined' && publicKey_client !== null)) {
    if (publicKey.length === 0) {

        console.log("false");
        //}
        res.send(false);

    } else {
        res.send("true");
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