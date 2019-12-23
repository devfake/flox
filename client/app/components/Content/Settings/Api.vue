<template>

  <div class="settings-box element-ui-checkbox no-select" v-if=" ! loading">
    <div class="login-error" v-if="config.env === 'demo'"><span>Data cannot be changed in the demo</span></div>

    <form class="login-form" @submit.prevent="generateApiKey()">
      <span class="update-check">API-Key</span>

      <input type="text" v-model="api_key" readonly>
      <input type="submit" :value="'Generate new key'">
    </form>
  </div>

</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import MiscHelper from '../../../helpers/misc';

  import http from 'axios';

  export default {
    mixins: [MiscHelper],

    created() {
      this.fetchApiKey();
    },

    data() {
      return {
        config: window.config,
        api_key: '',
        success: false,
      }
    },

    computed: {
      ...mapState({
        loading: state => state.loading
      })
    },

    methods: {
      ...mapMutations([ 'SET_LOADING' ]),

      fetchApiKey() {
        this.SET_LOADING(true);

        http(`${config.api}/api-key`).then(response => {
          this.api_key = response.data;

          this.SET_LOADING(false);
        });
      },

      generateApiKey() {
        this.SET_LOADING(true);

        http.patch(`${config.api}/settings/api-key`, {}).then((response) => {
          this.api_key = response.data;
          this.SET_LOADING(false);
        }, error => {
          alert(error.message);
        })
      }
    }
  }
</script>
