require('../resources/sass/app.scss');

import Vue from 'vue';
import { mapActions, mapState } from 'vuex'

import SiteHeader from './components/Header.vue';
import Search from './components/Search.vue';
import SiteFooter from './components/Footer.vue';
import Login from './components/Login.vue';
import Modal from './components/Modal/Index.vue';

import router from './routes';
import store from './store/index';

const App = new Vue({
  store,
  router,

  created() {
    this.checkForUserColorScheme();
  },

  computed: {
    ...mapState({
      colorScheme: state => state.colorScheme
    })
  },

  components: {
    SiteHeader, Search, SiteFooter, Login, Modal
  },

  methods: {
    ...mapActions([ 'setColorScheme' ]),

    checkForUserColorScheme() {
      if( ! localStorage.getItem('color')) {
        localStorage.setItem('color', 'dark');
      }

      this.setColorScheme(localStorage.getItem('color'));
    }
  }
});

App.$mount('#app');