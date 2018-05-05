module.exports = {
    generatePairKeys: function () {

        var NodeRSA = require('node-rsa');
        // generate Random RSA pair keys
        var key = new NodeRSA({ b: 512 });
        // private key
        key.generateKeyPair();
        let privateKey = key.exportKey("pkcs1-private-pem");

        // prublic key
        let publicKey = key.exportKey("pkcs8-public-pem");
        return { "publicKey": publicKey, "privateKey": privateKey };


    }

}

