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
        isHide: true
      };
    },
    methods: {
      click: function() {
        console.log(this);
      }
    },
    events: {
      display: function(name) {
        // console.log('display', name);
        if (name === 'v-menu-add') {
          this.$set('isHide', false);
        } else {
          this.$set('isHide', true);
        }
        // console.log(this.isHide);
      }
      
    }
  });

  Vue.component('v-status-add', {
    data: function() {
      return {
        isHide: true
      };
    },
    methods: {
      click: function() {
        console.log(this);
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
      display: function(name) {
        console.log('display', name);
        if (name === 'v-menu-import') {
          this.$set('isHide', false);
        } else {
          this.$set('isHide', true);
        }
        console.log(this.isHide);
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
    events: {
      display: function(name, data) {
        console.log('display', name);
        if (name === 'v-menu-detail') {
          console.log(data);
          this.$set('isHide', false);
          this.$set('movie', data);
        } else {
          this.$set('isHide', true);
        }
        console.log(this.isHide);
      }
    }
  });

  Vue.component('v-side-bar', {
    data: function() {
      return {
        isHide: {
          'v-menu-add': true
        }
      }
    },
    events: {
      display: function(name) {
        this.$set('isHide["' + name + '"]', false);
        console.log(name);
        // this['isHide']['v-menu-add'] = true;
        console.log(this.$get('isHide["v-menu-add"]'));
      }
    }
  });

  Vue.component('v-tool-bar', {
    methods: {
      openAddMenu: function() {
        // console.log('click');
        this.$dispatch('open-add');
        $('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
      },
      openImportMenu: function() {
        console.log('click');
        this.$dispatch('open-import');
        $('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
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
      
      return {};
    },
    methods: {
      openDetail: function(index) {
        this.$dispatch('open-detail', this.movies[index]);
        $('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
      },
      dataRetrived: function(responseText) {
        console.log(responseText);
        this.movies = responseText;
      }
    }
  });

  var vApp = new Vue({
    el: '#app',
    events: {
      'open-add': function() {
        this.$broadcast('display', 'v-menu-add');
        // console.log('open-add');
      },
      'open-import': function() {
        this.$broadcast('display', 'v-menu-import');
        // console.log('open-import');
      },
      'open-detail': function(data) {
        this.$broadcast('display', 'v-menu-detail', data);
        // console.log('open-detail');
      }
    }
  });
  

  Vue.component('t-hello', {
    template: '<p>aaa</p>'
  });

  Vue.component('t-next', {
    // template: '<a v-on="click: log">ccc</a>',
    data: function() {
      return {
        name: 'ccc',
        hasError: true
      }
    },
    methods: {
      log: function() {
        this.$set('name', 'bbb');
        this.$set('hasError', false);
        console.log('xxx');
        this.$dispatch('xxx');
      }
    }
  });

  var vDemo = new Vue({
    el: '#demo',
    data: {
      name: 'ccc'
    },
    events: {
      xxx: function() {
        console.log('parent');
      }
    }
  });

  

  $(document).foundation();
});



