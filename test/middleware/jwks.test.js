var chai = require('chai')
  , jwks = require('../../lib/middleware/jwks')


describe('jwks', function() {
  
  describe('serving public key from file system', function() {
    var response, json;

    before(function(done) {
      chai.connect.use(jwks('test/fixtures/rsa-pub-priv/public'))
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
      console.log(key);
      
      expect(Object.keys(key)).to.have.length(4);
      expect(key.kty).to.equal('RSA');
      expect(key.kid).to.equal('abc');
      expect(key.n).to.equal('AJtsP4ZkqXV8JiQTW8s8pb8-_g0c8s_QBqF9gI7clJYLOJxDWKyPUy2xTufZVwMw11TSFFOXKDe5LREt2bzhpOl-pT_mpFOm-jT9MmzL_rUUJBbWOWpIex1NQLqHR-_mfARdSM8JkF__Y9WVprWigLyIV_xKVbWn8l0qHmRmGf9xyfSQ6de_EEHDwP60Esk1PSm31V6cBfTg36x7btBG1uMF6BGZuPr-lzCB_QrogJSyEZIsA-mLWKeJAPISx4KHY3oRXUZ-mh63BeG1NTy6hU6C7Hwg1Wzdw0PqWxwFNGZZ4_xY9fEdDryJ4DNvm3mBuHUib417sEkETOMx-ILoB2c');
      expect(key.e).to.equal('AQAB');
    });
  });
  
});
