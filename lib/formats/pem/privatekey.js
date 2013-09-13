var forge = require('node-forge')
  , pki = forge.pki;

module.exports = function() {
  
  return function pemPrivateKey(data, done) {
    var key;
    try {
      key = pki.privateKeyFromPem(data);
    } catch (ex) {
      if (ex instanceof Error) {
        return done(ex);
      }
      return done(new Error(ex.message || 'Failed to parse as PEM-encoded private key'));
    }
    return done(null, key, 'privateKey');
  }
}
