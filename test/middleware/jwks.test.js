var chai = require('chai')
  , jwks = require('../../lib/middleware/jwks')


describe('jwks', function() {
  
  describe('serving public key from file system containing certificate with RSA key', function() {
    var response, json;

    before(function(done) {
      chai.connect.use(jwks('test/fixtures/cert-rsa/public', { ext: '.pem' }))
        .end(function(res) {
          response = res;
          json = JSON.parse(res.body);
          done();
        })
        .dispatch();
    });
    
    it('should have one key', function() {
      expect(json.keys).to.be.an('array');
      expect(json.keys.length).to.equal(1);
    });
    
    it('key should be formatted correctly', function() {
      var key = json.keys[0];
      
      expect(Object.keys(key)).to.have.length(4);
      expect(key.kty).to.equal('RSA');
      expect(key.kid).to.equal('A');
      expect(key.n).to.equal('AM7n3ddKIffNJdMkBJ6z3MWdC99RKKejhaSIkCqq9UWBx4N2Tnz7YPqz9pXJIYdbixboIF1Xc3zekxmWCilkJ2_vZd-oYIQAEIZZk6TZ4sk3i2coPV7UfAx6lHIp2l-K4qL6-VdjHEh41zq1fLkmXdZf8ANB4aiK8CKlkIvePGn8YSzSf4YfChG133vVR5fPyPdA_UdW1CDbT0zlO0_S4LxagsP2hmvTf11vD--fl88m5UcVXrz1gIEed5wZA35XrhlWC3dAIzFXJGk1akjBUFOx4msegwnVPrKclr_PInRO74tGaLN7V5l-AEZJfpObjqBnevQJ09jVGqceUQfdcGE');
      expect(key.e).to.equal('AQAB');
    });
  });
  
  describe('serving public key from file system containing RSA key', function() {
    var response, json;

    before(function(done) {
      chai.connect.use(jwks('test/fixtures/key-rsa/public'))
        .end(function(res) {
          response = res;
          json = JSON.parse(res.body);
          done();
        })
        .dispatch();
    });
    
    it('should have one key', function() {
      expect(json.keys).to.be.an('array');
      expect(json.keys.length).to.equal(1);
    });
    
    it('key should be formatted correctly', function() {
      var key = json.keys[0];
      
      expect(Object.keys(key)).to.have.length(4);
      expect(key.kty).to.equal('RSA');
      expect(key.kid).to.equal('abc');
      expect(key.n).to.equal('ALkFbkWQb7EKIcxdLP94IyLu08WDzAqJD_Xg5YiHdW8edjK1qeP8v-c3gNaP6OmC4DMWcpApf5Qd4jw6JK5oSADp4Jhng-yV5bziDAes8jU_Y2SbBvitxe6WEp4z1Qn66vIqvyKbRkV0VuRGGs4IDoiaDwahloG0X3Iulg4flOCbe3cu-KmT0r77F53DrxZF2TN4xeNTly_9-hdiXY7nu-mVYGVI1u72mE3uVF3gEd0qncj6_oAJQQe87CwC01ypeSEDtIiRLV5Zo2AKiwaYNBfaPvBRgz0c3vUuZX42x1UvGBrt_nwz8a6ckyxbvrKHrD1GQD174FBOPEpFRXXVSH8');
      expect(key.e).to.equal('AQAB');
    });
  });
  
  // TODO:
  // google: ietf jose dsa
  // https://www.ietf.org/mail-archive/web/jose/current/msg03694.html
  // https://github.com/mozilla/browserid-crypto/blob/master/lib/algs/ds.js
  describe.skip('serving public key from file system containing DSA key', function() {
    var response, json;

    before(function(done) {
      chai.connect.use(jwks('test/fixtures/key-dsa/public', { ext: '.pem' }))
        .end(function(res) {
          response = res;
          json = JSON.parse(res.body);
          done();
        })
        .dispatch();
    });
    
    it('should have one key', function() {
      expect(json.keys).to.be.an('array');
      expect(json.keys.length).to.equal(1);
    });
    
    it('key should be formatted correctly', function() {
      var key = json.keys[0];
      
      expect(Object.keys(key)).to.have.length(4);
      expect(key.kty).to.equal('RSA');
      expect(key.kid).to.equal('abc');
      expect(key.n).to.equal('ALkFbkWQb7EKIcxdLP94IyLu08WDzAqJD_Xg5YiHdW8edjK1qeP8v-c3gNaP6OmC4DMWcpApf5Qd4jw6JK5oSADp4Jhng-yV5bziDAes8jU_Y2SbBvitxe6WEp4z1Qn66vIqvyKbRkV0VuRGGs4IDoiaDwahloG0X3Iulg4flOCbe3cu-KmT0r77F53DrxZF2TN4xeNTly_9-hdiXY7nu-mVYGVI1u72mE3uVF3gEd0qncj6_oAJQQe87CwC01ypeSEDtIiRLV5Zo2AKiwaYNBfaPvBRgz0c3vUuZX42x1UvGBrt_nwz8a6ckyxbvrKHrD1GQD174FBOPEpFRXXVSH8');
      expect(key.e).to.equal('AQAB');
    });
  });
  
});
