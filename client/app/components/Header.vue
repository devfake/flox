<template>
  <header>
    <div class="wrap">
      <router-link to="/" class="logo" >
        <img src="../../../public/assets/img/logo.png" alt="Flox" width="108" height="32">
      </router-link>

      <span class="sort-wrap">
        <i title="Last Seen" class="icon-sort-time" :class="{active: userFilter == 'created_at'}" @click="setUserFilter('created_at')"></i>
        <i title="Best Rated" class="icon-sort-star" :class="{active: userFilter == 'rating'}" @click="setUserFilter('rating')"></i>
        <span title="Toggle Color" class="icon-constrast"  @click="toggleColorScheme()"><i></i></span>
      </span>

      <nav class="site-nav">
        <ul>
          <li><router-link to="/trending">Trending</router-link></li>
          <li><router-link to="/upcoming">Upcoming</router-link></li>
        </ul>
      </nav>

    </div>
  </header>
</template>

<script>
  import store from '../store/index';
  import { mapActions, mapMutations, mapState } from 'vuex'

  export default {
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

      setUserFilter(type) {
        localStorage.setItem('filter', type);
        this.SET_USER_FILTER(type);
        this.loadItems(type);
      }
    }
  }
</script>