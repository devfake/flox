<template>

  <div class="settings-box" v-if=" ! loading">
    <div class="login-error" v-if="config.env === 'demo'"><span>Data cannot be changed in the demo</span></div>
    <form class="login-form" @submit.prevent="editUser()">
      <input type="text" :placeholder="lang('username')" v-model="username">
      <input type="password" :placeholder="lang('password')" v-model="password" autocomplete="off">
      <span class="userdata-info">{{ lang('password message') }}</span>
      <span class="userdata-changed"><span v-if="success">{{ lang('success message') }}</span></span>
      <input type="submit" :value="lang('save button')">
    </form>
  </div>

</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import MiscHelper from '../../../helpers/misc';

  import http from 'axios';
  import debounce from 'debounce';

  const debounceMilliseconds = 2000;

  export default {
    mixins: [MiscHelper],

    created() {
      this.fetchUserData();
      this.clearSuccessMessage = debounce(this.clearSuccessMessage, debounceMilliseconds);
    },

    data() {
      return {
        config: window.config,
        username: '',
        password: '',
        success: false
      }
    },

    computed: {
      ...mapState({
        loading: state => state.loading
      })
    },

    methods: {
      ...mapMutations([ 'SET_LOADING' ]),

      fetchUserData() {
        this.SET_LOADING(true);

        http(`${config.api}/settings`).then(response => {
          this.SET_LOADING(false);
          this.username = response.data.username;
        });
      },

      editUser() {
        const username = this.username;
        const password = this.password;

        if(username != '') {
          http.patch(`${config.api}/userdata`, {username, password}).then(() => {
            this.success = true;
            this.clearSuccessMessage();
          });
        }
      },

      clearSuccessMessage() {
        this.success = false;
      }
    }
  }
</script>
