<template>
  <div class="header-wrap" :class="{active: displayHeader, sticky: sticky}">
    <header>
      <div class="wrap">
        <router-link to="/" @click.native="refresh('home')" class="logo">
          <img src="../../../public/assets/img/logo.png" alt="Flox" width="108" height="32">
        </router-link>

        <ul class="site-nav">
          <li><router-link to="/trending" @click.native="refresh('trending')">{{ lang('trending') }}</router-link></li>
          <li><router-link to="/now-playing" @click.native="refresh('now-playing')">{{ lang('now playing') }}</router-link></li>
          <li><router-link to="/upcoming" @click.native="refresh('upcoming')">{{ lang('upcoming') }}</router-link></li>
        </ul>

        <ul class="site-nav-second">
          <li><router-link to="/watchlist" @click.native="refresh('watchlist')" exact>{{ lang('watchlist') }}</router-link></li>
          <li><router-link to="/tv" @click.native="refresh('tv')" exact>{{ lang('tv') }}</router-link></li>
          <li><router-link to="/movies" @click.native="refresh('movie')" exact>{{ lang('movies') }}</router-link></li>
        </ul>
      </div>
    </header>
    
    <search></search>
  </div>
</template>

<script>
  import Search from './Search.vue';
  import MiscHelper from '../helpers/misc';
  import store from '../store/index';
  
  import { mapActions, mapState } from 'vuex'

  export default {
    mixins: [MiscHelper],

    data() {
      return {
        sticky: false,
        enableStickyOn: 100
      }
    },

    mounted() {
      this.initSticky();
    },
    
    computed: {
      ...mapState({
        itemLoadedSubpage: state => state.itemLoadedSubpage
      }),

      root() {
        return config.uri;
      }
    },

    methods: {
      ...mapActions([ 'loadItems' ]),

      initSticky() {
        window.onscroll = () => {
          this.sticky = document.body.scrollTop + document.documentElement.scrollTop > this.enableStickyOn;
        };
      },
      
      refresh(route) {
        let name = this.$route.name;

        if(name === route) {
          this.loadItems({name});
        }
      }
    },
    
    components: {
      Search
    }
  }
</script>
