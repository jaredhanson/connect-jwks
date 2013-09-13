var path = require('path')
  , fs = require('fs')
  , Parser = require('../parser')
  , PrivateKey = require('../privatekey');

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
  parser.format(require('../formats/pem/privatekey')());
  
  return function jwksPrivate(req, res, next) {
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
          try {
            var key;
            switch (type) {
              case 'privateKey':
                key = PrivateKey.toJWK(obj);
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
