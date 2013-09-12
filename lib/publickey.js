var base64url = require('base64url');

exports.toJWK = function(key) {
  var jwk = { kty: 'RSA' } // FIXME: How to determine this?
  jwk.n = base64url(key.n.toByteArray());
  jwk.e = base64url(key.e.toByteArray());
  return jwk;
}
