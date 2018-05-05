const uuidv4 = require('uuid/v4');
let uuid = uuidv4();
console.log(uuid);


var NodeRSA = require('node-rsa');
// generate Random RSA pair keys
var key = new NodeRSA({ b: 512 });
console.log(key.isPublic());

// private key
key.generateKeyPair();
let privateKey = key.exportKey("pkcs1-private-pem");

console.log(privateKey);

// prublic key
let publicKey = key.exportKey("pkcs8-public-pem");
console.log(publicKey);