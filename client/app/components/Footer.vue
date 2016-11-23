<template>
  <footer v-show=" ! loading">
    <div class="wrap">
      <span class="attribution">
        <a href="https://www.themoviedb.org/" target="_blank">
          <i class="icon-tmdb"></i>
        </a>
        This product uses the TMDb API but is not endorsed or certified by TMDb
      </span>

      <a class="icon-github" href="https://github.com/devfake/flox" target="_blank"></a>

      <div class="sub-links">
        <a v-if="auth" :href="settings" class="login-btn">{{ lang('settings') }}</a>
        <a v-if="auth" :href="logout" class="login-btn">{{ lang('logout') }}</a>
        <a v-if=" ! auth" :href="login" class="login-btn">Login</a>
      </div>
    </div>
  </footer>
</template>

<script>
  import { mapState } from 'vuex';
  import Helper from '../helper';

  export default {
    mixins: [Helper],

    data() {
      return {
        auth: config.auth,
        logout: config.api + '/logout',
        login: config.url + '/login',
        settings: config.url + '/settings'
      }
    },

    computed: {
      ...mapState({
        loading: state => state.loading
      })
    }
  }
</script>