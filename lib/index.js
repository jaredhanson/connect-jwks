var jwks = require('./middleware/jwks');

exports = module.exports = jwks;
exports.jwks = jwks;

exports.formats = {};
exports.formats.pemCertificate = require('./formats/pem/certificate');
