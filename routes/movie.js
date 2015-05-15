var express = require('express'),
    util = require('../lib/util'),
    movieDao = require('../lib/dao/movieDao');

var router = express.Router();

router.post('/add', function(req, res) {
  var ed2k = req.body.url;

  var movie = util.initMovie(ed2k);

  if (!movie) return res.send({errno: 1, message: '格式错误：[' + ed2k + ']'});

  movieDao.add(movie, function(err) {
    if (err) {
      res.send({errno: 1, message: err.message});
    } else {
      res.send({errno: 0, data: movie});
    }
  });

});

router.post('/delete', function(req, res) {
  var hash = req.body.hash;
  movieDao.delete(hash, function(err) {
    if (err) {
      res.send({errno: 1, message: err.message});
    } else {
      res.send({errno: 0, hash: hash});
    }
  })
});

router.post('/update', function(req, res) {
  var data = req.body;
  // console.log(data);

  // get movie
  movieDao.get(data.hash, function(err, movie) {
    if (err) {
      res.send({errno: 1, message: err.message});
    } else {
      if (data.brand && data.brand.trim().length > 0) {
        movie.brand = data.brand.trim();
      }
      
      movie.seriesName = data.seriesName;
      movie.sno = data.sno;
      movie.seasonName = data.seasonName;
      if (data.showName && data.showName.trim().length > 0) {
        movie.showName = data.showName.trim();
      }
      movie.eno = data.eno;
      movie.episodeName = data.episodeName;
      movie.cno = data.cno;
      movie.date = data.date;
      movie.actors = typeof data.actors === 'string' ? JSON.parse(data.actors) : data.actors;
      // console.log(movie.actors);

      movie.finished = data.finished;
      movie.thumbup = data.thumbup;

      // rename movie
      util.renameMovie(movie);
      if (movie.fileName === movie.type) {
        res.send({errno: 1, message: '文件名不正确'});
      } else {

        // update movie
        movieDao.update(movie, function(err) {
          if (err) {
            res.send({errno: 1, message: err.message});
          } else {
            res.send({errno: 0, data: movie});
          }
        });
      }
    }
  });
  
});

router.get('/list', function(req, res) {
  movieDao.list(function(err, arr) {
    if (err) {
      res.send({errno: 1, message: err.message});
    } else {
      res.send({errno: 0, data: arr});
    }
  })
});

router.get('/search', function(req, res) {
  var q = (req.body.q ? req.body.q : '').split(/\W+/);
  // TODO fix
  res.send(q);
});

module.exports = router;