var base64url = require('base64url');

exports.toJWK = function(key, options) {
  options = options || {};
  
  if (key.n) {
    var jwk = { kty: 'RSA' };
    if (options.id) { jwk.kid = options.id; }
    
    // TODO: Implement support for alg, x5u, x5t, and x5c parameters
    
    jwk.n = base64url(key.n.toByteArray());
    jwk.e = base64url(key.e.toByteArray());
    return jwk;
  }
  
  // TODO: Implement support for other public key formats.  Currently, the
  //       underlying `forge` module only supports RSA keys.
  
  throw new Error('Unknown public key format');
}
