var fs = require('fs');

var data = {}, init = false;

// cb: function()
function readFile(cb) {
  if (init) return cb();
  fs.readFile('movie-data', function(err, content) {
    // console.log(err, content);
    data = (err || !content) ? {} : JSON.parse(content);
    // console.log(data);
    init = true;
    cb();
  });
}

// cb: function(err)
function writeFile(cb) {
  fs.writeFile('movie-data', JSON.stringify(data), function(err) {
    cb(err);
  });
}

var dao = {
  // cb: function(err)
  add: function(movie, cb) {
    readFile(function() {
      if (!movie.hash) {
        cb(new Error('[movieDao add] invalid hash'));
      } else if (!data[movie.hash]) {
        data[movie.hash] = movie;
        writeFile(cb);
      } else {
        var err = new Error('[MovieDao add] movie existed.'); 
        err.movie = data[movie.hash];
        cb(err);
      }
    });
  },

  // cb: function(err)
  update: function(movie, cb) {
    readFile(function() {
      if(!data[movie.hash]) return cb(new Error('[MovieDao update] movie doesn\'t exist.'));
      data[movie.hash] = movie;
      writeFile(cb);
    });
  },

  // cb: function(err, movie)
  mark: function(hash, flag, cb) {
    readFile(function() {
      var movie = data[hash];

      if (!movie) return cb(new Error('MovieDao mark] movie doesn\'t exist.'), null);
      movie.flag = flag;

      if (flag === 0x02) {
        delete movie.originalFileName;
        delete movie.title;
        delete movie.brand;
        delete movie.seriesName;
        delete movie.sno;
        delete movie.seasonName;
        delete movie.showName;
        delete movie.eno;
        delete movie.episodeName;
        delete movie.cno;
        delete movie.date;
        delete movie.actors;
      }
      // console.log(data[hash].flag);
      writeFile(function(err) {
        cb(err, movie);
      });
    });
  },

  // cb: function(err)
  delete: function(hash, cb) {
    readFile(function() {
      if (!data[hash]) return cb(new Error('[MovieDao delete] movie doesn\'t exist.'));
      delete data[hash];
      writeFile(cb);
    })
  },

  // flag: number?
  // cb: function(err, arr)
  list: function() {
    var flag, cb;
    if (typeof arguments[0] === 'number') {
      flag = arguments[0];
      cb = arguments[1];
    } else {
      flag = 0x0d;
      cb = arguments[0];
    }
    console.log('flag', flag);

    readFile(function() {
      var arr = [];
      for (var key in data) {
        if (data[key].hash && (data[key].flag & flag) != 0) arr.push(data[key]);
      }
      cb(null, arr);
    });
  },

  // q: string, 'key words'
  // f: number, flag
  // cb: function(err, arr)
  search: function(q, f, cb) {
    dao.list(f, function(err, arr) {
      // console.log(q);
      if (!q) return cb(null, arr);

      q = q.toLowerCase();
      var t1 = [], // match without modification
          t2 = [], // match all the tokens
          t3 = [], // match any tokens
          tokens = q.split(/\s+/).map(function(v) {
            return new RegExp('\\b' + v + '\\b');
          }),
          i, isT2, isT3,
          length = tokens.length,
          template = null;

      arr.forEach(function(movie) {
        template = (movie.fileName + ' ' + movie.originalFileName).toLowerCase();

        if (template.indexOf(q) > -1) {
          // console.log(movie.flag);
          // perfect match
          t1.push(movie);
        } else if (length > 1) {
          // test partial match
          for (i = 0, isT2 = true, isT3 = false; i < length; ++i) {
            if (template.search(tokens[i]) > -1) {
              isT3 = true;
            } else {
              isT2 = false;
            }
          } // end iteration of key words

          if (isT2) {
            t2.push(movie);
          } else if (isT3) {
            t3.push(movie);
          }
        }
      }); // end iteration of list
      cb(null, t1.concat(t2.concat(t3)));
    });
  },

  // cb: function(err, movie)
  get: function(hash, cb) {
    readFile(function() {
      if (data[hash]) {
        cb(null, data[hash]);
      } else {
        cb(new Error('[MovieDao get] movie doesn\'t exist.'), null);
      }
    });
  }
}

module.exports = dao;