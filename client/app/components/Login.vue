<template>
  <div>
    <span class="top-bar"></span>
    <div class="login-wrap">

      <img src="../../../public/assets/img/logo-login.png" class="logo-login" alt="Flox" width="108" height="32">

      <form class="login-form" @submit.prevent="login()">
        <input type="text" :placeholder="lang('username')" v-model="username" autofocus>
        <input type="password" :placeholder="lang('password')" v-model="password">

        <span class="login-error"><span v-if="error">{{ lang('login error') }}</span></span>

        <input type="submit" :class="errorShake ? 'shake-horizontal shake-constant' : ''" :value="lang('login button')">
      </form>

    </div>
  </div>
</template>

<script>
  import http from 'axios';
  import Helper from '../helper';

  export default {
    mixins: [Helper],

    created() {
      document.body.classList.add('dark');
    },

    data() {
      return {
        username: '',
        password: '',
        error: false,
        errorShake: false
      }
    },

    methods: {
      login() {
        this.error = false;
        const username = this.username;
        const password = this.password;

        http.post(`${config.api}/login`, {username, password}).then(value => {
          window.location.href = config.url;
        }, error => {
          this.error = true;
          this.errorShake = true;

          setTimeout(() => {
            this.errorShake = false;
          }, 500);
        })
      }
    }
  }
</script>