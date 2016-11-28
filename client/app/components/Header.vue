<template>
  <header>
    <div class="wrap">
      <router-link to="/" class="logo" >
        <img src="../../../public/assets/img/logo.png" alt="Flox" width="108" height="32">
      </router-link>

      <span class="sort-wrap">
        <i :title="lang('last seen')" class="icon-sort-time" :class="{active: userFilter == 'created_at'}" @click="setUserFilter('created_at')"></i>
        <i :title="lang('best rated')" class="icon-sort-star" :class="{active: userFilter == 'rating'}" @click="setUserFilter('rating')"></i>
        <span :title="lang('change color')" class="icon-constrast"  @click="toggleColorScheme()"><i></i></span>
      </span>

      <ul class="site-nav">
        <li><router-link to="/trending">{{ lang('trending') }}</router-link></li>
        <li><router-link to="/upcoming">{{ lang('upcoming') }}</router-link></li>
      </ul>

      <ul class="site-nav-second">
        <li><router-link to="/tv">{{ lang('tv') }}</router-link></li>
        <li><router-link to="/movies">{{ lang('movies') }}</router-link></li>
      </ul>

    </div>
  </header>
</template>

<script>
  import Helper from '../helper';
  import store from '../store/index';
  import { mapActions, mapMutations, mapState } from 'vuex'

  export default {
    mixins: [Helper],

    created() {
      this.checkForUserFilter();
    },

    computed: {
      ...mapState({
        userFilter: state => state.userFilter,
        colorScheme: state => state.colorScheme
      }),
      root() {
        return config.uri;
      }
    },

    methods: {
      ...mapActions([ 'setColorScheme', 'loadItems' ]),
      ...mapMutations([ 'SET_USER_FILTER' ]),

      toggleColorScheme() {
        const color = this.colorScheme == 'light' ? 'dark' : 'light';

        this.setColorScheme(color);
      },

      checkForUserFilter() {
        if( ! localStorage.getItem('filter')) {
          localStorage.setItem('filter', 'created_at');
        }

        this.SET_USER_FILTER(localStorage.getItem('filter'));
      },

      setUserFilter(filter) {
        let name = this.$route.name;

        localStorage.setItem('filter', filter);
        this.SET_USER_FILTER(filter);
        this.loadItems({name, filter});
      }
    }
  }
</script>