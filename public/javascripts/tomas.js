$(document).ready(function() {

  // Vue.config.debug = true;
  // app
  //   side bar
  //     menu ...
  //   main
  //     tool bar
  //     list

  Vue.component('v-menu-add', {
    data: function() {
      return {
        // isHide: true,
        isPending: false,
        url: ''
      };
    },
    methods: {
      click: function() {
        this.$set('isPending', true);

        console.log('url', this.url);

        $.post('/api/movie/add', {
          url: this.url
        }, function(responseText) {
          console.log(responseText);
          this.$set('isPending', false);
          this.$dispatch('open-status-add', responseText);
        }.bind(this));
        
      }
    },
    events: {
      show: function(name) {
        if (name === 'v-menu-add') {
          this.$set('isPending', false);
          $(this.$el).addClass('active');
        } else {
          $(this.$el).removeClass('active');
        }
      }
      
    }
  });

  Vue.component('v-status-add', {
    data: function() {
      return {
        movie: {},
        message: '',
        isSuccess: false
      };
    },
    events: {
      show: function(name, responseText) {
        if (name === 'v-status-add') {
          if (responseText.errno === 1) {
            this.$set('isSuccess', false);
            this.$set('message', responseText.message);
          } else {
            this.$set('isSuccess', true);
            this.$set('movie', responseText.data);
            this.$dispatch('movie-add', responseText.data);
          }
          
          $(this.$el).addClass('active');
        } else {
          $(this.$el).removeClass('active');
        }
      }
    },
    methods: {
      openAddMenu: function() {
        this.$dispatch('open-add');
      },
      openDetail: function() {
        this.$dispatch('open-detail', this.movie);
      }
    }
  });

  Vue.component('v-menu-import', {
    data: function() {
      return {
        isHide: true
      };
    },
    events: {
      show: function(name) {
        // console.log('show', name);
        if (name === 'v-menu-import') {
          $(this.$el).addClass('active');
        } else {
          $(this.$el).removeClass('active');
        }
      }
    }
  });

  Vue.component('v-menu-detail', {
    data: function() {
      return {
        isHide: true,
        movie: {}
      };
    },
    methods: {
      update: function() {
        this.$dispatch('open-update', this.movie);
      },
      delete: function() {
        this.$dispatch('open-delete', this.movie);
      }
    },
    events: {
      show: function(name, movie) {
        // console.log('show', name);
        if (name === 'v-menu-detail') {
          // console.log(movie);
          this.$set('movie', movie);
          $(this.$el).addClass('active');
        } else {
          $(this.$el).removeClass('active');
        }
      }
    }
  });

  Vue.component('v-menu-update', {
    data: function() {
      return {
        movie: {},
        movieUpdated: {},
        isSeason: 'false',
        actors: ''
      }
    },
    methods: {
      submit: function() {
        // console.log(this.isSeason);
        // console.log(this.movieUpdated);

        if (this.isSeason === 'true') {
          delete this.movieUpdated.showName;
        } else {
          delete this.movieUpdated.sno;
          delete this.movieUpdated.seasonName;
        }

        // console.log(this.actors);
        this.movieUpdated.actors = JSON.stringify(
          this.actors.split(/[,&]/).map(function(v) {
            return {name: v.trim()};
          })
        );
        // console.log(this.movieUpdated.actors);
        // console.log(JSON.stringify(this.movieUpdated));

        $.post('/api/movie/update', this.movieUpdated, function(responseText) {
          console.log(responseText);
          this.$dispatch('open-status-update', responseText);
        }.bind(this));
      },
      cancel: function() {
        this.$dispatch('open-detail', this.movie);
      }
    },
    events: {
      show: function(name, movie) {
        if (name === 'v-menu-update') {
          console.log('update', movie);
          this.$set('movie', movie);
          this.$set('movieUpdated', JSON.parse(JSON.stringify(movie)));

          this.$set('isSeason', (movie.sno || movie.seasonName) ? 'true' : 'false');
          this.$set('actors', movie.actors ? movie.actors.map(function(v) {
            return v.name;
          }).join(', ') : '');

          $(this.$el).addClass('active');
        } else {
          $(this.$el).removeClass('active');
        }
      }
    }
  });

  Vue.component('v-status-update', {
    data: function() {
      return {
        movie: {},
        message: ''
      }
    },
    methods: {
      openDetail: function() {
        this.$dispatch('open-detail', this.movie);
      },
      close: function() {
        this.$dispatch('hide');
      }
    },
    events: {
      show: function(name, responseText) {
        if (name === 'v-status-update') {
          if (responseText.errno === 0) {
            this.$set('movie', responseText.data);
            this.$set('message', '修改成功');

            this.$dispatch('movie-update', responseText.data);
          } else {
            this.$set('message', responseText.message);
          }

          $(this.$el).addClass('active');
        } else {
          $(this.$el).removeClass('active');
        }
      }
    }
  })

  Vue.component('v-menu-delete', {
    data: function() {
      return {
        movie: {}
      }
    },
    methods: {
      delete: function() {
        // console.log(this.movie.hash);

        $.post('/api/movie/delete', {
          hash: this.movie.hash
        }, function(responseText) {
          console.log(responseText);
          this.$dispatch('open-status-delete', responseText);
        }.bind(this));
      },
      cancel: function() {
        this.$dispatch('open-detail', this.movie);
      }
    },
    events: {
      show: function(name, movie) {
        if (name === 'v-menu-delete') {
          this.$set('movie', movie);
          $(this.$el).addClass('active');
        } else {
          $(this.$el).removeClass('active');
        }
      }
    }
  });

  Vue.component('v-status-delete', {
    data: function() {
      return {
        message: ''
      }
    },
    methods: {
      close: function() {
        this.$dispatch('hide');
      }
    },
    events: {
      show: function(name, responseText) {
        if (name === 'v-status-delete') {
          if (responseText.errno === 0) {
            this.$dispatch('movie-delete', responseText.hash);
            this.$set('message', '删除成功');
          } else {
            this.$set('message', responseText.message);
          }
          $(this.$el).addClass('active');
        } else {
          $(this.$el).removeClass('active');
        }
      }
    }
  });

  Vue.component('v-side-bar', {
    data: function() {
      return {
        isHide: {
          'v-menu-add': true
        },
        isSideBarOpen: false
      }
    },
    methods: {
      openSideBar: function() {
        // console.log(this);
        $(this.$el).addClass('active');
        this.$set('isSideBarOpen', true);
      },
      hideSideBar: function() {
        $(this.$el).removeClass('active');
        this.$set('isSideBarOpen', false);
      }
    },
    events: {
      show: function(name) {
        if (!this.isSideBarOpen) {
          this.openSideBar();
        }

        // console.log(name);
      },
      hide: function() {
        this.hideSideBar();
      }
    }
  });

  Vue.component('v-tool-bar', {
    methods: {
      openAddMenu: function() {
        // console.log('click');
        this.$dispatch('open-add');
        // $('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
      },
      openImportMenu: function() {
        console.log('click');
        this.$dispatch('open-import');
        // $('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
      }
    }
  });

  Vue.component('v-list', {
    data: function() {
      // console.log('data');
      $.get('/api/movie/list').success(function(responseText) {
        // console.log(this);
        // TODO what if responseText.errno == 1?
        this.$set('movies', responseText.data);
        // this.$emit('dataRetrived', responseText);
      }.bind(this));
      
      return {
        movies: []
      };
    },
    methods: {
      openDetail: function(index) {
        this.$dispatch('open-detail', this.movies[index]);
        // $('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
      },
      dataRetrived: function(responseText) {
        console.log(responseText);
        this.movies = responseText;
      },
      openDelete: function(index) {
        this.$dispatch('open-delete', this.movies[index]);
      }
    },
    events: {
      movieAdded: function(movie) {
        // console.log('movie-add', movie);
        var movies = this.movies;
        movies.push(movie);
        this.$set('movies', movies);
      },
      movieDeleted: function(hash) {
        console.log('movie-delete', hash);
        var movies = this.movies, index = -1;
        movies.forEach(function(v, i) {
          if (v.hash === hash) {
            index = i;
          }
        });

        if (index > -1) {
          movies.splice(index, 1);
          this.$set('movies', movies);
        }
      },
      movieUpdated: function(movie) {
        console.log('movie-update', movie);
        var movies = this.movies, index = -1;
        movies.forEach(function(v, i) {
          if (v.hash === movie.hash) {
            index = i;
          }
        });

        if (index > -1) {
          movies[index] = movie;
          // console.log(movie.fileName);
          // force to change reference
          this.$delete('movies');
          this.$set('movies', movies);
        }
      }
    }
  });

  var vApp = new Vue({
    el: '#app',
    data: {
      movies: []
    },
    methods: {
      hide: function() {
        this.$broadcast('hide');
      }
    },
    events: {
      'hide': function() {
        this.hide();
      },
      'open-add': function() {
        // console.log('open-add');
        this.$broadcast('show', 'v-menu-add');
      },
      'open-status-add': function(responseText) {
        // console.log('open-status-add');
        this.$broadcast('show', 'v-status-add', responseText);
      },
      'open-import': function() {
        // console.log('open-import');
        this.$broadcast('show', 'v-menu-import');
      },
      'open-detail': function(movie) {
        // console.log('open-detail');
        this.$broadcast('show', 'v-menu-detail', movie);
      },
      'open-delete': function(movie) {
        // console.log('open-delete');
        this.$broadcast('show', 'v-menu-delete', movie);
      },
      'open-status-delete': function(responseText) {
        // console.log('open-status-delete');
        this.$broadcast('show', 'v-status-delete', responseText);
      },
      'open-update': function(movie) {
        // console.log('open-update');
        this.$broadcast('show', 'v-menu-update', movie);
      },
      'open-status-update': function(responseText) {
        this.$broadcast('show', 'v-status-update', responseText);
      },
      'movie-add': function(movie) {
        this.$broadcast('movieAdded', movie);
      },
      'movie-delete': function(hash) {
        this.$broadcast('movieDeleted', hash);
      },
      'movie-update': function(movie) {
        this.$broadcast('movieUpdated', movie);
      }
    }
  });

  // $(document).foundation();
});



