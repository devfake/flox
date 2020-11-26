require('../resources/sass/app.scss');

import Vue from 'vue';
import { mapState, mapActions, mapMutations } from 'vuex'
import VueHotkey from 'v-hotkey';

import { Checkbox } from 'element-ui';

Vue.use(Checkbox);
Vue.use(VueHotkey);

import SiteHeader from './components/Header.vue';
import SiteFooter from './components/Footer.vue';
import Login from './components/Login.vue';
import Modal from './components/Modal/Index.vue';

import router from './routes';
import store from './store';

const App = new Vue({
  store,
  router,

  created() {
    this.checkForUserColorScheme();
    this.checkForUserFilter();
    this.checkForUserSortDirection();
    this.checkForUserHideCompleted();

    // Close filter dropdown
    document.body.onclick = event => {
      const target = event.target;

      if(target !== document.querySelector('.current-filter') && this.showFilters) {
        this.SET_SHOW_FILTERS(false);
      }
    }
  },

  computed: {
    ...mapState({
      colorScheme: state => state.colorScheme,
      filters: state => state.filters,
      showFilters: state => state.showFilters
    })
  },

  components: {
    SiteHeader, SiteFooter, Login, Modal
  },

  methods: {
    ...mapActions([ 'setColorScheme' ]),
    ...mapMutations([ 'SET_USER_FILTER', 'SET_SHOW_FILTERS', 'SET_USER_SORT_DIRECTION', 'SET_USER_HIDE_COMPLETED' ]),

    checkForUserColorScheme() {
      if( ! localStorage.getItem('color')) {
        localStorage.setItem('color', 'dark');
      }

      this.setColorScheme(localStorage.getItem('color'));
    },

    checkForUserFilter() {
      let filter = localStorage.getItem('filter');

      if( ! filter || ! this.filters.includes(filter)) {
        localStorage.setItem('filter', this.filters[0]);
      }

      this.SET_USER_FILTER(localStorage.getItem('filter'));
    },

    checkForUserSortDirection() {
      if( ! localStorage.getItem('sort-direction')) {
        localStorage.setItem('sort-direction', 'desc');
      }

      this.SET_USER_SORT_DIRECTION(localStorage.getItem('sort-direction'));
    },

    checkForUserHideCompleted() {
      if( ! localStorage.getItem('hide-completed')) {
        localStorage.setItem('hide-completed', "false");
      }

      this.SET_USER_HIDE_COMPLETED(localStorage.getItem('hide-completed') === 'true');
    }
  }
});

App.$mount('#app');
