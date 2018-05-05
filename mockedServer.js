var express = require('express');
var querystring = require('querystring');
var http = require('http');

let bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Checks the values from the REST Server
 */
app.post('/', function (req, res) {
    //console.log(req.body.data);
    console.log("Inside");
    console.log(req.body);
    res.sendStatus(200);
});

app.listen(8090);