module.exports = {
    generatePairKeys: function (toSign) {

        var NodeRSA = require('node-rsa');
        // generate Random RSA pair keys
        var key = new NodeRSA({ b: 512 });
        // private key
        key.generateKeyPair();
        let privateKey = key.exportKey("pkcs1-private-pem");

        // prublic key
        let publicKey = key.exportKey("pkcs8-public-pem");

        // sign
        let signature = key.sign(toSign);

        // verify
        let isVerified = key.verify(toSign, signature);

        return { "publicKey": publicKey, "privateKey": privateKey, "signature": signature };
    }
}

