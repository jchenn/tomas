function parseEd2k(url) {
  var res = /^(ed2k:\/\/\|file\|)(.+)\|(\d+)\|(\w+)\|(h=\w+\|)?\//.
              exec((url + '').trim().replace('%20', ' '));

  // console.log(res);

  if (!res) return null;

  var type = /.+\.(\w+)$/.exec(res[2]);

  return {
    protocal: res[1],
    fileName: res[2],
    bytes: res[3],
    size: getSize(res[3]),
    type: type ? type[1].toLowerCase() : '',
    hash: res[4],
    rootHash: res[5] ? res[5] : '',
    url: res.input
  };
}

// title: seriesName - sno seasonName | showName - eno episodeName Part cno
function getTitle(movie) {
  var title = '', delima = '';

  if (movie.seriesName) {
    title += movie.seriesName;
    delima = ' - ';
  }

  if (movie.sno) {
    title += delima + 'S' + [].slice.call('0' + movie.sno, -2).join('');
    delima = ' ';
  }
  
  if (movie.seasonName) {
    title += delima + movie.seasonName;
    delima = ' - ';
  } else if (movie.showName) {
    title += delima + movie.showName;
    delima = ' - ';
  }

  delima = delima ? ' - ' : '';

  if (movie.eno) {
    title += delima + 'E' + [].slice.call('0' + movie.eno, -2).join('');
    delima = ' ';
  }

  if (movie.episodeName) {
    title += delima + movie.episodeName;
    delima = ' ';
  }

  delima = delima ? ' ' : '';

  if (movie.cno) {
    title += delima + 'Part ' + [].slice.call('0' + movie.cno, -2).join('');
  }

  return title;
}

// fileName: brand - title (date) - a1, a2.type
function getFileName(movie) {
  var fileName = '', delima = '';

  if (movie.brand) {
    fileName += movie.brand;
    delima = ' - ';
  }

  if (movie.title) {
    fileName += delima + movie.title;
    delima = ' ';
  }

  if (movie.date) {
    fileName += delima + '(' + movie.date + ')';
    delima = ' - ';
  }

  delima = delima ? ' - ' : '';


  if (movie.actors && movie.actors.length > 0) {
    var actors = movie.actors.reduce(function(arr, actor, i) {
      
      if (actor.name.trim().length > 0) {
        // console.log(i, actor);
        arr.push(actor.name.trim());
      }

      return arr;
    }, []).join(', ');

    fileName += actors ? delima + actors : '';

    delima = '.';
  }

  delima = delima ? '.' : '';

  if (movie.type) {
    fileName += delima + movie.type;
  }

  return fileName;
}

function getSize(byte) {
  return [' KB', ' MB', ' GB'].reduce(function(pre, unit) {
    return byte >= 1024 ? (byte = ~~(byte / 1024 * 100) / 100) + unit : pre;
  }, byte + ' B');
}

function initMovie(ed2k) {
  var seg = parseEd2k(ed2k);

  if (!seg) return null;

  var now = new Date();
  return {
    hash: seg.hash,
    fileName: seg.fileName,
    originalFileName: seg.fileName,
    createDate: now.getFullYear() + '.' + (now.getMonth() + 1) + '.' + now.getDate(),
    bytes: seg.bytes,
    size: seg.size,
    type: seg.type,
    url: seg.url,
    rootHash: seg.rootHash,
    finished: false,
    formatted: false,
    thumbup: false
  };
}

module.exports = {
  parseEd2k: parseEd2k,
  renameMovie: function(movie) {
    var title = getTitle(movie);
    movie.title = title;
    var fileName = getFileName(movie);
    movie.fileName = fileName;
    movie.url = 'ed2k://|file|' + movie.fileName + '|' + 
                movie.bytes + '|' + movie.hash + '|' + 
                (typeof movie.rootHash === 'string' ? movie.rootHash : '') + '/';
  },
  initMovie: initMovie
};