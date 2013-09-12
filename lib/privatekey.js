var base64url = require('base64url');

exports.toJWK = function(key) {
  if (key.n) {
    var jwk = { kty: 'RSA' }
    jwk.n = base64url(key.n.toByteArray());
    jwk.e = base64url(key.e.toByteArray());
    jwk.d = base64url(key.d.toByteArray());
    jwk.p = base64url(key.p.toByteArray());
    jwk.q = base64url(key.q.toByteArray());
    jwk.dp = base64url(key.dP.toByteArray());
    jwk.dq = base64url(key.dQ.toByteArray());
    jwk.qi = base64url(key.qInv.toByteArray());
    return jwk;
  }
  
  // TODO: Implement support for other public key formats.  Currently, the
  //       underlying `forge` module only supports RSA keys.
  
  throw new Error('Unknown private key format');
}
