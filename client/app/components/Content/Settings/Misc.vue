<template>

  <div class="settings-box" v-if=" ! loading">
    <div class="version-wrap">
      <span class="current-version">{{ lang('current version') }} <span>{{ version }}</span></span>
      <span class="update-check" v-if=" ! isUpdate">{{ updateMessage }}</span>
      <span class="update-check" v-if="isUpdate">
        <a href="https://github.com/devfake/flox/releases" target="_blank" class="new-update">{{ lang('new update') }}</a>
      </span>
    </div>

    <div class="misc-btn-wrap">
      <button @click="fetchFiles()" class="export-btn">Update files</button>
      <button @click="updateGenre()" class="export-btn">{{ lang('update genre') }}</button>
      <button @click="updateAlternativeTitles()" class="export-btn">Update alternative titles</button>
      <button @click="syncScout()" class="export-btn">{{ lang('sync scout') }}</button>
    </div>
  </div>

</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import Helper from '../../../helper';

  import http from 'axios';

  export default {
    mixins: [Helper],

    created() {
      this.checkUpdate();
      this.fetchVersion();
    },

    data() {
      return {
        version: '',
        isUpdate: null
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
      },

      updateGenre() {
        this.SET_LOADING(true);

        http.patch(`${config.api}/update-genre`).then(() => {
          this.SET_LOADING(false);
        });
      },

      updateAlternativeTitles() {
        this.SET_LOADING(true);

        http.patch(`${config.api}/update-alternative-titles`).then(() => {
          this.SET_LOADING(false);
        });
      },

      syncScout() {
        this.SET_LOADING(true);

        http(`${config.api}/sync-scout`).then(() => {
          this.SET_LOADING(false);
        });
      }
    }

  }
</script>