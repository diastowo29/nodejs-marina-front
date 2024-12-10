export function saltAndHashPassword (pwd:string) {
    var crypto = require('crypto');
    var assert = require('assert');

    var algorithm = 'aes256';
    var key = 'R@hasia';

    var cipher = crypto.createCipher(algorithm, key);  
    var encrypted = cipher.update(pwd, 'utf8', 'hex') + cipher.final('hex');
    return encrypted;
}