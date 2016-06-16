var pemtools = require('pemtools')
var fs = require('fs')

//var str = fs.readFileSync('test/fixtures/key-ec/public/3.key', {encoding: 'utf8' })
var str = fs.readFileSync('test/fixtures/key-rsa/public/abc.key', {encoding: 'utf8' })
//var pem = pemtools(str, 'RSA PRIVATE KEY', 'something super secret')
console.log(str)

var pem = new pemtools.PEM();
pem.decode(str);
console.log(pem)

console.log('------')
var sasn1 = require('sasn1'); 
console.log(require('util').inspect(sasn1.decode(pem.buf), { showHidden: true, depth: null }));

//console.log(sasn1.decode(pem.buf));

//asn.Entity.decode(pem.buf);