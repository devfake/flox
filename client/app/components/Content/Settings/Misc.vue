<template>

  <div class="settings-box" v-if=" ! loading">
    <div class="version-wrap">
      <span class="current-version">{{ lang('current version') }} <span>{{ version }}</span></span>
      <span class="update-check" v-if=" ! isUpdate">{{ updateMessage }}</span>
      <span class="update-check" v-if="isUpdate">
        <a href="https://github.com/devfake/flox/releases" target="_blank" class="new-update">{{ lang('new update') }}</a>
      </span>
      <span class="update-check">{{ lang('feedback') }} <a href="https://github.com/devfake/flox/issues" target="_blank">GitHub</a></span>
    </div>

    <!--<div class="misc-btn-wrap">-->
      <!--<button @click="fetchFiles()" class="setting-btn">{{ lang('call file-parser') }}</button>-->
    <!--</div>-->
  </div>

</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import MiscHelper from '../../../helpers/misc';

  import http from 'axios';

  export default {
    mixins: [MiscHelper],

    created() {
      this.checkUpdate();
      this.fetchVersion();
    },

    data() {
      return {
        version: '',
        isUpdate: null,
      }
    },

    computed: {
      ...mapState({
        loading: state => state.loading
      }),

      updateMessage() {
        if(this.isUpdate === false) {
          return this.lang('no update');
        }

        return this.lang('checking update');
      }
    },

    methods: {
      ...mapMutations([ 'SET_LOADING' ]),

      fetchFiles() {
        this.SET_LOADING(true);

        http.post(`${config.api}/fetch-files`).then(() => {
          this.SET_LOADING(false);
        }).catch(error => {
          this.SET_LOADING(false);
          alert(error.response.data);
        });
      },

      checkUpdate() {
        http(`${config.api}/check-update`).then(response => {
          this.isUpdate = response.data;
        });
      },

      fetchVersion() {
        this.SET_LOADING(true);

        http(`${config.api}/version`).then(response => {
          this.SET_LOADING(false);
          this.version = response.data.version;
        });
      }
    }
  }
</script>
