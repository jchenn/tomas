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
      res.send({errno: 0});
    }
  })
});

router.get('/rename', function(req, res) {
  var movie = req.body;
  util.renameMovie(movie);
  if (movie.fileName === movie.type) {
    res.send({errno: 1, message: '文件名不正确'});
  } else {
    res.send({errno: 0, data: {fileName: movie.fileName, title: movie.title}});
  }
});

router.post('/update', function(req, res) {
  var movie = req.body;

  // TODO check if the request body is forged

  movieDao.update(movie, function(err) {
    if (err) {
      res.send({errno: 1, message: err.message});
    } else {
      res.send({errno: 0, data: movie});
    }
  })
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