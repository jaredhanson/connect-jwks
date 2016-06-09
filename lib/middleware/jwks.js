var path = require('path')
  , fs = require('fs')
  , Parser = require('../parser')
  , PublicKey = require('../publickey');

var FSKeyring = require('nks-fs').Keyring;
var pki = require('node-forge').pki;
var base64url = require('base64url');
var jsrsasign = require('jsrsasign');
  

module.exports = function(root, options) {
  if (typeof root == 'object') {
    options = root;
    root = options.root;
  }
  options = options || {};
  
  if (!root) { throw TypeError('connect-jwks middleware requires a root path'); }
  
  root = path.normalize(root);
  
  var keyring = new FSKeyring(null, root, options);
  
  
  // Initialize parser with supported formats.
  var parser = new Parser();
  parser.format(require('../formats/pem/certificate')());
  
  return function jwks(req, res, next) {
    keyring.all(function(err, keys) {
      var jwks = []
        , key, fk, jwk
        , i, len;
      for (i = 0, len = keys.length; i < len; ++i) {
        key = keys[i];
        jwk = { kid: key.id };
        
        
        //var c = new jsrsasign.X509();
        //c.readCertPEM(key.public);
        //console.log(c);
        
        if (key.public) {
          try {
            fk = pki.publicKeyFromPem(key.public);
            
            jwk.kty = 'RSA';
            jwk.n = base64url(fk.n.toByteArray());
            jwk.e = base64url(fk.e.toByteArray());
            
            jwks.push(jwk);
          } catch (ex) {
            try {
              fk = pki.certificateFromPem(key.public);
              
              // TODO: Ensure this works for other algorithms.
              jwk.kty = 'RSA';
              jwk.n = base64url(fk.publicKey.n.toByteArray());
              jwk.e = base64url(fk.publicKey.e.toByteArray());
              
              jwks.push(jwk);
            } catch (ex) {
              return next(ex)
            }
          }
        }
      }
      
      // TODO: Set Content-Type header
      var body = JSON.stringify({ keys: jwks });
      return res.end(body);
    });
    
    
    return;
    
    
    fs.readdir(root, function(err, files) {
      if (err) { return next(err); }
      
      console.log(files);
      
      var idx = 0;
      function iter(err) {
        if (err) { return next(err); }
    
        var file = files[idx++];
        if (!file) {
          var body = JSON.stringify({ keys: keys });
          return res.end(body);
        }
    
        parser.parse(path.resolve(root, file), function(err, obj, type) {
          //console.log(obj);
          //console.log(type);
          
          if (err) { return iter(); }
          try {
            var key;
            switch (type) {
              case 'certificate':
                if (obj.publicKey) { key = PublicKey.toJWK(obj.publicKey, { id: file }); }
                break;
              default:
                break;
            }
            
            if (key) { keys.push(key); }
            iter();
          } catch (ex) {
            return iter(ex);
          }
        });
      }
      iter();
    });
  }
}