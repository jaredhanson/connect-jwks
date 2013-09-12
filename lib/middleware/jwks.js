var path = require('path')
  , fs = require('fs')
  , Parser = require('../parser')
  , PublicKey = require('../publickey');

module.exports = function(root, options) {
  if (typeof root == 'object') {
    options = root;
    root = options.root;
  }
  options = options || {};
  
  if (!root) { throw TypeError('connect-jwks middleware requires a root path'); }
  
  root = path.normalize(root);
  
  // Initialize parser with supported formats.
  var parser = new Parser();
  parser.format(require('../formats/pem/certificate')());
  
  return function jwks(req, res, next) {
    var keys = [];
    
    fs.readdir(root, function(err, files) {
      if (err) { return next(err); }
      
      var idx = 0;
      function iter(err) {
        if (err) { return next(err); }
    
        var file = files[idx++];
        if (!file) {
          return res.send({ keys: keys });
        }
    
        parser.parse(path.resolve(root, file), function(err, obj, type) {
          if (err) { return iter(); }
          
          console.log('PARSED! ' + file);
          console.log(type);
          console.log(obj);
          console.log('****')
          console.log(obj.publicKey);
          
          var key = PublicKey.toJWK(obj.publicKey);
          keys.push(key);
          
          iter();
        });
      }
      iter();
    });
  }
}