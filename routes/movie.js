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
      if (err.movie) {
        res.send({errno: 1, message: err.message, movie: err.movie});
      } else {
        res.send({errno: 2, message: err.message});
      }
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
      // trim brand
      if (data.brand && data.brand.trim().length > 0) {
        movie.brand = data.brand.trim();
      } else {
        movie.brand = '';
      }
      
      // trim seriesName
      if (data.seriesName && data.seriesName.trim().length > 0) {
        movie.seriesName = data.seriesName.trim();
      } else {
        movie.seriesName = '';
      }
     
      movie.sno = data.sno;
      // trim seasonName
      if (data.seasonName && data.seasonName.trim().length > 0) {
        movie.seasonName = data.seasonName.trim();
      } else {
        movie.seasonName = '';
      }

      // trim showName
      if (data.showName && data.showName.trim().length > 0) {
        movie.showName = data.showName.trim();
      } else {
        movie.showName = '';
      }

      movie.eno = data.eno;

      // trim episodeName
      if (data.episodeName && data.episodeName.trim().length > 0) {
        movie.episodeName = data.episodeName.trim();
      } else {
        movie.episodeName = '';
      }

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

router.post('/mark', function(req, res) {
  var hash = req.body.hash,
      flag = parseInt(req.body.flag);

  movieDao.mark(hash, flag, function(err, movie) {
    if (err) {
      res.send({errno: 1, message: err.message});
    } else {
      res.send({errno: 0, movie: movie});
    }
  })
})

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
  console.log(req.query);
  var q = req.query.q || '',
      f = parseInt(req.query.f) || 0x0d;
  movieDao.search(q.trim(), f, function(err, arr) {
    if (err) {
      res.send({errno: 1, message: err.message});
    } else {
      res.send({errno: 0, data: arr});
    }
  });
});

module.exports = router;