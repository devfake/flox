<template>
  <div class="header-wrap" :class="{active: displayHeader, sticky: sticky, 'mobile-open': mobileNavigationOpen}">
    <header>
      <div class="wrap">
        <router-link to="/" @click.native="refresh('home')" class="logo">
          <img src="../../../public/assets/img/logo.png" alt="Flox" width="108" height="32">
        </router-link>
        
        <i @click="toggleMobileNavigation()" class="icon-hamburger"></i>

        <ul class="site-nav site-nav-first">
          <li>
            <router-link to="/trending" @click.native="refresh('trending')">{{ lang('trending') }}</router-link>
          </li>
          <li>
            <router-link to="/now-playing" @click.native="refresh('now-playing')">{{ lang('now-playing') }}
            </router-link>
          </li>
          <li>
            <router-link to="/upcoming" @click.native="refresh('upcoming')">{{ lang('upcoming') }}</router-link>
          </li>
        </ul>

        <ul class="site-nav-second">
          <li>
            <router-link to="/calendar" @click.native="refresh('calendar')">{{ lang('calendar') }}</router-link>
          </li>
          <li>
            <router-link to="/watchlist" @click.native="refresh('watchlist')" exact>{{ lang('watchlist') }}
            </router-link>
          </li>
          <li>
            <router-link to="/tv" @click.native="refresh('tv')" exact>{{ lang('tv') }}</router-link>
          </li>
          <li>
            <router-link to="/movies" @click.native="refresh('movie')" exact>{{ lang('movies') }}</router-link>
          </li>
        </ul>
      </div>
    </header>

    <search></search>
  </div>
</template>

<script>
  import Search from './Search.vue';
  import MiscHelper from '../helpers/misc';

  import {mapActions, mapState} from 'vuex'

  export default {
    mixins: [MiscHelper],

    data() {
      return {
        sticky: false,
        enableStickyOn: 100,
        latestRoute: '',
        mobileNavigationOpen: false
      }
    },

    mounted() {
      this.latestRoute = this.$route.name;
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
      ...mapActions(['loadItems']),

      initSticky() {
        window.onscroll = () => {
          this.sticky = document.body.scrollTop + document.documentElement.scrollTop > this.enableStickyOn;
        };
      },

      toggleMobileNavigation() {
        this.mobileNavigationOpen = !this.mobileNavigationOpen;
      },
      
      refresh(route) {
        this.mobileNavigationOpen = false;
        let name = this.$route.name;
        
        // Reload only if the page is the same.
        if (this.latestRoute === route) {
          this.loadItems({name});
        }

        this.latestRoute = name;
      }
    },

    components: {
      Search
    }
  }
</script>
