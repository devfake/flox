<template>
  <main>
    <div class="wrap-content" v-if=" ! loading">
      <div class="version-wrap">
        <span class="current-version">{{ lang('current version') }} <span>{{ version }}</span></span>
        <span class="update-check" v-if=" ! isUpdate">{{ updateMessage }}</span>
        <span class="update-check" v-if="isUpdate">
          <a href="https://github.com/devfake/flox/releases" target="_blank" class="new-update">{{ lang('new update') }}</a>
        </span>
      </div>

      <div class="settings-box">
        <span class="nothing-found">{{ lang('headline user') }}</span>
        <form class="login-form" @submit.prevent="editUser()">
          <input type="text" :placeholder="lang('username')" v-model="username">
          <input type="password" :placeholder="lang('password')" v-model="password" autocomplete="off">
          <span class="userdata-info">{{ lang('password message') }}</span>
          <span class="userdata-changed"><span v-if="success">{{ lang('success message') }}</span></span>
          <input type="submit" :value="lang('save button')">
        </form>
      </div>
      <div class="settings-box">
        <span class="nothing-found">{{ lang('headline export import') }}</span>
        <a :href="exportLink" class="export-btn">{{ lang('export button') }}</a>
        <form class="login-form" @submit.prevent="importMovies()">
          <span class="import-info">{{ lang('or divider') }}</span>
          <input type="file" @change="upload" class="file-btn" required>
          <span class="userdata-changed"><span v-if="uploadSuccess">{{ lang('success import') }}</span></span>
          <input type="submit" :value="lang('import button')">
        </form>
      </div>
      <div class="settings-box">
        <span class="nothing-found">{{ lang('headline misc') }}</span>
        <button @click="updateGenre()" class="export-btn">{{ lang('update genre') }}</button>
        <span class="userdata-info">{{ lang('genre message') }}</span>
        <span class="import-info">{{ lang('or divider') }}</span>
        <button @click="syncScout()" class="export-btn">{{ lang('sync scout') }}</button>
        <span class="import-info">{{ lang('or divider') }}</span>
        <div class="checkbox">
          <input type="checkbox" value="genre" v-model="displayGenre" id="genre" @change="updateSettings"><label for="genre">{{ lang('display genre') }}</label>
        </div>
        <div class="checkbox">
          <input type="checkbox" value="date" v-model="displayDate" id="date" @change="updateSettings"><label for="date">{{ lang('display date') }}</label>
        </div>
        <div class="checkbox">
          <input type="checkbox" value="spoiler" v-model="spoilerProtection" id="spoiler" @change="updateSettings"><label for="spoiler">{{ lang('spoiler') }}</label>
        </div>
      </div>
    </div>

    <span class="loader fullsize-loader" v-if="loading"><i></i></span>
  </main>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import Helper from '../../helper';

  import http from 'axios';

  export default {
    mixins: [Helper],

    created() {
      this.checkUpdate();
      this.fetchSettings();
    },

    data() {
      return {
        username: '',
        password: '',
        version: '',
        isUpdate: null,
        displayGenre: null,
        displayDate: null,
        spoilerProtection: null,
        success: false,
        uploadSuccess: false,
        uploadedFile: null
      }
    },

    computed: {
      ...mapState({
        loading: state => state.loading
      }),

      exportLink() {
        return config.api + '/export';
      },

      updateMessage() {
        if(this.isUpdate === false) {
          return this.lang('no update');
        }

        return this.lang('checking update');
      }
    },

    methods: {
      ...mapMutations([ 'SET_LOADING' ]),

      upload(event) {
        const file = event.target.files || event.dataTransfer.files;

        this.uploadedFile = new FormData();
        this.uploadedFile.append('import', file[0]);
      },

      updateSettings() {
        const date = this.displayDate;
        const genre = this.displayGenre;
        const spoiler = this.spoilerProtection;

        http.patch(`${config.api}/settings`, {date, genre, spoiler}).catch(error => {
          alert('Error');
        });
      },

      importMovies() {
        if(this.uploadedFile) {
          const confirm = window.confirm(this.lang('import warn'));

          if(confirm) {
            this.SET_LOADING(true);
            http.post(`${config.api}/import`, this.uploadedFile).then(value => {
              this.SET_LOADING(false);
              this.uploadSuccess = true;
            }, error => {
              this.SET_LOADING(false);
              alert('Error: ' + error.data);
            });
          }
        }
      },

      checkUpdate() {
        http(`${config.api}/check-update`).then(response => {
          this.isUpdate = response.data;
        });
      },

      fetchSettings() {
        this.SET_LOADING(true);
        http(`${config.api}/settings`).then(value => {
          const data = value.data;

          this.SET_LOADING(false);
          this.username = data.username;
          this.displayGenre = data.genre;
          this.displayDate = data.date;
          this.version = data.version;
          this.spoilerProtection = data.spoiler;
        });
      },

      editUser() {
        const username = this.username;
        const password = this.password;

        if(username != '') {
          http.patch(`${config.api}/userdata`, {username, password}).then(value => {
            this.success = true;
            this.clearSuccessMessage();
          });
        }
      },

      updateGenre() {
        this.SET_LOADING(true);

        http(`${config.api}/update-genre`).then(value => {
          this.SET_LOADING(false);
        });
      },

      syncScout() {
        this.SET_LOADING(true);

        http(`${config.api}/sync-scout`).then(value => {
          this.SET_LOADING(false);
        });
      },

      clearSuccessMessage() {
        setTimeout(() => {
          this.success = false;
        }, 2000);
      }
    }
  }
</script>