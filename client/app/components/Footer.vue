<template>
  <footer v-show=" ! loading && ! hideFooter">
    <div class="wrap">
      <span class="attribution">
        <a class="tmdb-logo" href="https://www.themoviedb.org/" target="_blank">
          <i class="icon-tmdb"></i>
        </a>
        This product uses the TMDb API but is not endorsed or certified by TMDb
      </span>

      <span class="footer-actions">
        <span :title="lang('change color')" class="icon-constrast"  @click="toggleColorScheme()"><i></i></span>
        <a class="icon-github" href="https://github.com/devfake/flox" target="_blank"></a>
      </span>

      <div class="sub-links">
        <a v-if="auth" :href="settings" class="login-btn">{{ lang('settings') }}</a>
        <a v-if="auth" :href="logout" class="login-btn">{{ lang('logout') }}</a>
        <a v-if=" ! auth" :href="login" class="login-btn">Login</a>
      </div>
    </div>
  </footer>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import MiscHelper from '../helpers/misc';

  export default {
    mixins: [MiscHelper],

    data() {
      return {
        hideFooter: false,
        auth: config.auth,
        logout: config.api + '/logout',
        login: config.url + '/login',
        settings: config.url + '/settings'
      }
    },

    computed: {
      ...mapState({
        colorScheme: state => state.colorScheme,
        loading: state => state.loading
      })
    },
    
    created() {
      this.disableFooter();
    },

    methods: {
      ...mapActions([ 'setColorScheme' ]),

      toggleColorScheme() {
        const color = this.colorScheme === 'light' ? 'dark' : 'light';

        this.setColorScheme(color);
      },
      
      disableFooter() {
        this.hideFooter = this.$route.name === 'calendar';
      }
    },

    watch: {
      $route() {
        this.disableFooter();
      }
    }
  }
</script>
