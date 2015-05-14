var chai = require('chai'),
    expect = chai.expect,
    movieDao = require('../lib/dao/movieDao');

describe('Movie DAO', function() {
  // it('should add a movie', function(done) {
  //   movieDao.add(movies[0], done);
  // });

  // it('should delete a movie', function(done) {
  //   movieDao.delete(movies[0].hash, done);
  // });

  // it('should update a movie', function(done) {
  //   movies[0].brand = 'Channel One';
  //   movieDao.update(movies[0], done);
  // });

  it('should return a movie list', function(done) {
    movieDao.list(function(err, arr) {
      // console.log(arr);
      expect(arr.length).to.be.a('number');
      done();
    });
  })
})