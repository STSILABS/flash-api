describe('User Request Tests', function() {
  describe('when non authorized', function () {
    it ('GET /v1/users should return 401', function (done) {
      chai.request(server)
      .get('/v1/users')
      .end(function(err, res) {
        expect(res).to.have.status(401);
        done();
      });
    });

    it ('GET /v1/users/:username should return 401', function (done) {
      chai.request(server)
      .get('/v1/users/someuser')
      .end(function(err, res) {
        expect(res).to.have.status(401);
        done();
      });
    });
  });

  describe('when authorized', function () {
    var apiKey;
    var user;

    beforeEach(function(){
      var apiConfig = require('../../../app/config/api-config');
      apiKey = apiConfig.getValidKey();
      user = {
        username: 'gwashington',
        password: 'george1'
      }
    });

    it ('GET /v1/users should return list of users', function (done) {
      chai.request(server)
      .get('/v1/users')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.data).to.be.a('array');
        expect(res.body.meta).to.be.a('object');
        expect(res.body.meta.params.api_key).to.equal(apiKey);
        expect(res.body.meta.user).to.equal('gwashington');
        expect(res.body.meta.date).to.not.be.null;
        done();
      });
    });

    it ('GET /v1/users/:username should return desired user', function (done) {
      chai.request(server)
      .get('/v1/users/gwashington')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.data).to.be.a('object');
        expect(res.body.data.username).to.equal('gwashington');
        expect(res.body.meta).to.be.a('object');
        expect(res.body.meta.params.api_key).to.equal(apiKey);
        expect(res.body.meta.user).to.equal('gwashington');
        expect(res.body.meta.date).to.not.be.null;
        done();
      });
    });

    it ('GET /v1/users/:username should return 404 when user is not found', function (done) {
      chai.request(server)
      .get('/v1/users/someuser')
      .auth(user.username, user.password)
      .query({api_key: apiKey})
      .end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

});
