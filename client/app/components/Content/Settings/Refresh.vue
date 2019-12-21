<template>

  <div class="settings-box element-ui-checkbox no-select" v-if=" ! loading">
    <div class="login-error" v-if="config.env === 'demo'"><span>Data cannot be changed in the demo</span></div>

    <div class="setting-box">
      <el-checkbox v-model="refresh" @change="updateRefresh">{{ lang('refresh automatically') }}</el-checkbox>
    </div>

    <div class="misc-btn-wrap">
      <button v-show=" ! refreshAllClicked" @click="refreshAll()" class="setting-btn">{{ lang('refresh all infos') }}</button>
      <span v-show="showRefreshAllMessage" class="update-check">{{ lang('refresh all triggered') }}</span>
    </div>

  </div>

</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import MiscHelper from '../../../helpers/misc';

  import http from 'axios';

  export default {
    mixins: [MiscHelper],

    created() {
      this.fetchOptions();
    },

    data() {
      return {
        config: window.config,
        refresh: false,
        refreshAllClicked: false,
        showRefreshAllMessage: false,
      }
    },

    computed: {
      ...mapState({
        loading: state => state.loading
      })
    },

    methods: {
      ...mapMutations([ 'SET_LOADING' ]),

      fetchOptions() {
        this.SET_LOADING(true);
        http(`${config.api}/settings`).then(response => {
          this.refresh = response.data.refresh;

          this.SET_LOADING(false);
        });
      },

      updateRefresh() {
        this.SET_LOADING(true);

        http.patch(`${config.api}/settings/refresh`, {refresh: this.refresh}).then(() => {
          this.SET_LOADING(false);
        }, error => {
          alert(error.message);
        })
      },

      refreshAll() {
        this.refreshAllClicked = true;

        http.patch(`${config.api}/refresh-all`).then(() => {
          this.showRefreshAllMessage = true;
        }).catch(error => {
          this.refreshAllClicked = false;
          alert(error.response.data);
        });
      }
    }

  }
</script>
