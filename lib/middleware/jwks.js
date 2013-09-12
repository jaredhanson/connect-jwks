var path = require('path')
  , fs = require('fs')
  , Parser = require('../parser');

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
  
  
  return function jwks(req, res, next) {
    console.log('JWKS MIDDLEWARE!');
    
    fs.readdir(root, function(err, files) {
      if (err) { return next(err); }
      
      console.log('FILES:');
      console.log(files);
      
      
      var idx = 0;
      function iter(err) {
        if (err) { return next(err); }
    
        var file = files[idx++];
        if (!file) {
          console.log('DONE!');
          var keys = [];
          return res.send({ keys: keys });
        }
    
        console.log('PARSE FILE: ' + file);
        iter();
      }
      iter();
    });
  }
}