var chai = require('chai'),
    expect = chai.expect,
    util = require('../lib/util'),
    testData = require('./test-data'),
    urls = testData.urls,
    movies = testData.movies,
    invalidUrls = testData.invalidUrls;

describe('util - parse ed2k', function() {
  it('should work if there is no root hash', function() {
    var res = util.parseEd2k(urls[0]);
    expect(res.protocal).to.equal('ed2k://|file|');
    expect(res.size).to.equal('1.07 GB');
    expect(res.type).to.equal('avi');
    expect(res.rootHash).to.equal('');
  });

  it('should work if there is a root hash', function() {
    var res = util.parseEd2k(urls[1]);
    expect(res.protocal).to.equal('ed2k://|file|');
    // console.log(res.size);
    expect(res.size).to.equal('1.49 GB');
    expect(res.type).to.equal('avi');
    expect(res.rootHash).to.equal('h=HH6JEGVXZ7AIO6QK2KVJ5MPDIV6LDUDD|');
  });

  it('should return null if url is malformed', function() {
    var res = util.parseEd2k(invalidUrls[0]);
    expect(res).to.be.null;
  });

  it('should omit the heading and trailing blank', function() {
    var res = util.parseEd2k(urls[1]);
    expect(res.protocal).not.to.be.null;
  });

  it('should omit the file type if there is none', function() {
    // var res = util.parseEd2k(urls[4]);
    // expect(res.type).to.equal('');
  });
});

describe('util - init movie', function() {
  it('should create a movie object by a url', function() {
    var movie = util.initMovie(urls[1]);
    // expect(movie.hash).to.be.equal(movies[0].hash);
    // console.log(movie);
  });
});

describe('util - rename movie', function() {
  it('0, brand, showName, type', function() {
    util.renameMovie(movies[0]);
    expect(movies[0].title).to.equal('A Night At Bruno\'s DVD');
    expect(movies[0].fileName).to.equal('Channel One - A Night At Bruno\'s DVD.avi');
  });

  it('1, brand, showName, date, actors, type', function() {
    util.renameMovie(movies[1]);
    expect(movies[1].title).to.equal('Head Trip');
    expect(movies[1].fileName).to.equal('Titan - Head Trip (2012) - David Anthony, Jessy Ares, Allen Silver, Brad Kalvo, Johnny Hazzard, Will Swagger.avi');
  });

  it('2, showName, actors, type', function() {
    util.renameMovie(movies[2]);
    expect(movies[2].title).to.equal('Unqualified');
    expect(movies[2].fileName).to.equal('Unqualified - Phenix Saint, Christopher Daniels.mp4');
  });

  it('3, brand, showName, cno, actors, type', function() {
    util.renameMovie(movies[3]);
    expect(movies[3].title).to.equal('Auto Erotic Part 02');
    expect(movies[3].fileName).to.equal('Raging Stallion - Auto Erotic Part 02 - Boomer Banks, Sean Zevran.mp4');
  });

  it('4, brand, seriesName, showName, actors, type', function() {
    util.renameMovie(movies[4]);
    expect(movies[4].title).to.equal('The Gay Office - Hotel Room Hook Up');
    expect(movies[4].fileName).to.equal('MEN - The Gay Office - Hotel Room Hook Up - Topher DiMaggio, Christopher Daniels.avi');
  });

  it('5, brand, actors, type', function() {
    util.renameMovie(movies[5]);
    expect(movies[5].title).to.equal('');
    expect(movies[5].fileName).to.equal('Titan - David Anthony, Johnny Hazzard.mp4');
  });

  it('6, brand, showName, episodeName, date, actors, type', function() {
    util.renameMovie(movies[6]);
    expect(movies[6].title).to.equal('Unseen - Proctologist');
    expect(movies[6].fileName).to.equal('UK Naked Men - Unseen - Proctologist (2011.11) - Johnny Hazzard, Harley Everett.mp4');
  });

  it('7, brand, showName, actors, type', function() {
    util.renameMovie(movies[7]);
    expect(movies[7].title).to.equal('Turn On');
    expect(movies[7].fileName).to.equal('Men At Play - Turn On - Misha Dante, Dani Robles.mp4');
  });

  it('8, brand, showName, eno, episodeName, actors, type', function() {
    util.renameMovie(movies[8]);
    expect(movies[8].title).to.equal('Bucks County - E02 Road To Temptation');
    expect(movies[8].fileName).to.equal('Falcon - Bucks County - E02 Road To Temptation (2013) - Woody Fox, Kip Johnson.mp4');
  });

});