<template>
  <main>
    <div class="wrap-content" v-if=" ! loading">
      <div class="settings-box">
        <span class="nothing-found">User</span>
        <form class="login-form" @submit.prevent="editUser()">
          <input type="text" placeholder="Username" v-model="username">
          <input type="password" placeholder="Password" v-model="password" autocomplete="off">
          <span class="userdata-info">Leave the password field blank if you don't want to change it</span>
          <span class="userdata-changed"><span v-if="success">Successful changed</span></span>
          <input type="submit" value="Save">
        </form>
      </div>
      <div class="settings-box">
        <span class="nothing-found">Export / Import</span>
        <a :href="exportLink" class="export-btn">Export Movies</a>
        <form class="login-form" @submit.prevent="importMovies()">
          <span class="import-info">OR</span>
          <input type="file" @change="upload" class="file-btn" required>
          <span class="userdata-changed"><span v-if="uploadSuccess">Movies successful imported</span></span>
          <input type="submit" value="Import movies">
        </form>
      </div>
      <div class="settings-box">
        <span class="nothing-found">Misc</span>
        <button @click="updateGenre()" class="export-btn">Update Genre</button>
        <span class="import-info">OR</span>
        <button @click="syncScout()" class="export-btn">Sync Laravel Scout</button>
        <span class="import-info">OR</span>
        <div class="checkbox">
          <input type="checkbox" value="genre" v-model="displayGenre" id="genre" @change="updateSettings"><label for="genre">Display Genre</label>
        </div>
        <div class="checkbox">
          <input type="checkbox" value="date" v-model="displayDate" id="date" @change="updateSettings"><label for="date">Display Date</label>
        </div>
      </div>
    </div>

    <span class="loader fullsize-loader" v-if="loading"><i></i></span>
  </main>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    created() {
      this.fetchSettings();
    },

    data() {
      return {
        username: '',
        password: '',
        displayGenre: null,
        displayDate: null,
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

        this.$http.patch(`${config.api}/settings`, {date, genre}).catch(error => {
          alert('Error');
        });
      },

      importMovies() {
        if(this.uploadedFile) {
          const confirm = window.confirm('All movies will be replaced. Be sure you have made an backup!');

          if(confirm) {
            this.SET_LOADING(true);
            this.$http.post(`${config.api}/import`, this.uploadedFile).then(value => {
              this.SET_LOADING(false);
              this.uploadSuccess = true;
            }, error => {
              this.SET_LOADING(false);
              alert('Error: ' + error.body);
            });
          }
        }
      },

      fetchSettings() {
        this.SET_LOADING(true);
        this.$http.get(`${config.api}/settings`).then(value => {
          const data = value.body;

          this.SET_LOADING(false);
          this.username = data.username;
          this.displayGenre = data.genre;
          this.displayDate = data.date;
        });
      },

      editUser() {
        const username = this.username;
        const password = this.password;

        if(username != '') {
          this.$http.patch(`${config.api}/userdata`, {username, password}).then(value => {
            this.success = true;
            this.clearSuccessMessage();
          });
        }
      },

      updateGenre() {
        this.SET_LOADING(true);

        this.$http.get(`${config.api}/update-genre`).then(value => {
          this.SET_LOADING(false);
        });
      },

      syncScout() {
        this.SET_LOADING(true);

        this.$http.get(`${config.api}/sync-scout`).then(value => {
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