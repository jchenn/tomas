var chai = require('chai'),
    expect = chai.expect,
    request = require('supertest')('http://localhost:3000'),
    testData = require('./test-data'),
    urls = testData.urls,
    movies = testData.movies;

// add, list, rename, update, delete

describe('server', function() {
  it('should be started.', function(done) {
    request.get('/').expect(200, done);
  });
});

describe('/api/movie/delete', function() {
  it('should delete a movie', function(done) {
    request.post('/api/movie/delete').
      send({hash: movies[1].hash}).
      expect(200).
      expect('content-type', 'application/json; charset=utf-8').
      end(function(err, res) {
        expect(res.body.errno).to.be.a('number');
        if (res.body.errno != 0) {
          expect(res.body.message).to.be.a('string');
          console.log(res.body.message);
        }
        done(err);
      });
    // console.log('commented');
    // done();
  });
});

describe('/api/movie/add', function() {
  it('should should add a movie', function(done) {
    request.post('/api/movie/add').
      send({url: urls[1]}).
      expect('content-type', 'application/json; charset=utf-8').
      end(function(err, res) {
        // console.log(res);
        if (err) return done(err);

        var body = res.body;
        // console.log(body);

        expect(body.errno).to.be.a('number');

        if (body.errno == 0) {
          expect(body.data).to.be.an('object');
        } else {
          expect(body.message).to.be.a('string');
          console.log(body.message);
        }
        done(err);
      });
  });
});

describe('/api/movie/list', function() {
  it('should return a movie list', function(done) {
    request.get('/api/movie/list').
      expect(200).
      expect('content-type', 'application/json; charset=utf-8').
      end(function(err, res) {
        // console.log(err, res.body);
        expect(res.body.errno).to.equal(0);
        expect(res.body.data.length).to.be.a('number');
        done(err);
      });
  });
});

describe('/api/movie/update', function() {
  it('should change a movie\'s file name', function(done) {
    request.post('/api/movie/update').
      send(movies[1]).
      expect(200).
      expect('content-type', 'application/json; charset=utf-8').
      end(function(err, res) {
        expect(res.body.errno).to.be.a('number');
        if (res.body.errno == 0) {
          expect(res.body.data.fileName).to.equal(movies[1].fileName);
          expect(res.body.data.actors.length).to.be.a('number');
        } else {
          expect(res.body.message).to.be.a('string');
          console.log(res.body.message);
        }
        done(err);
      });
  });
});

