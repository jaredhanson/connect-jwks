/**
 * Module dependencies.
 */
var fs = require('fs');


function Parser() {
  this._formats = [];
}

Parser.prototype.format = function(fn) {
  this._formats.push(fn);
};

Parser.prototype.parse = function(path, cb) {
  var self = this;
  
  fs.readFile(path, function(err, data) {
    if (err) { return cb(err); }
    
    var stack = self._formats
      , idx = 0;
    
    function next(err, obj, type) {
      if (err || obj) { return cb(err, obj, type); }
    
      var layer = stack[idx++];
      if (!layer) { return cb(new Error('Failed to parse file: ' + path)); }
    
      try {
        layer(data, function(err, obj, type) {
          if (err) {
            // An error parsing a particular format is ignored.  Instead,
            // attempts will continue using other supported formats.  Only if
            // attempts fail, will an error be signalled.
            return next();
          }
          return next(null, obj, type);
        });
      } catch (ex) {
        next(ex);
      }
    }
    next();
  });
};


/**
 * Expose `Parser`.
 */
module.exports = Parser;
