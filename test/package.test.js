/* global describe, it */

var pkg = require('..');
var expect = require('chai').expect;


describe('connect-jwks', function() {
  
  it('should export middleware', function() {
    expect(pkg).to.be.a('function');
  });
  
});
