var jwks = require('./middleware/jwks')
  , jwksPrivate = require('./middleware/jwksPrivate');

exports = module.exports = jwks;
exports.jwks = jwks;
exports.jwksPrivate = jwksPrivate;

exports.formats = {};
exports.formats.pemCertificate = require('./formats/pem/certificate');
exports.formats.pemPrivateKey = require('./formats/pem/privatekey');
