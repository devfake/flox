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
        <a :href="exportLink" class="export-btn">Export movies</a>
        <form class="login-form" @submit.prevent="importMovies()">
          <span class="import-info">OR</span>
          <input type="file" @change="upload" class="file-btn" required>
          <span class="userdata-changed"><span v-if="uploadSuccess">Movies successful imported</span></span>
          <input type="submit" value="Import movies">
        </form>
      </div>
    </div>

    <span class="loader fullsize-loader" v-if="loading"><i></i></span>
  </main>
</template>

<script>
  export default {
    created() {
      this.fetchUserData();
    },

    data() {
      return {
        loading: true,
        username: '',
        password: '',
        success: false,
        uploadSuccess: false,
        uploadedFile: null
      }
    },

    computed: {
      exportLink() {
        return config.api + '/export';
      }
    },

    methods: {
      upload(event) {
        const file = event.target.files || event.dataTransfer.files;

        this.uploadedFile = new FormData();
        this.uploadedFile.append('import', file[0]);
      },

      importMovies() {
        if(this.uploadedFile) {
          const confirm = window.confirm('All movies will be replaced. Be sure you have made an backup!');

          if(confirm) {
            this.loading = true;
            this.$http.post(`${config.api}/import`, this.uploadedFile).then(value => {
              this.loading = false;
              this.uploadSuccess = true;
            }, error => {
              this.loading = false;
              alert('Error: ' + error.body);
            });
          }
        }
      },

      fetchUserData() {
        this.$http.get(`${config.api}/get-userdata`).then(value => {
          const data = value.body;

          this.loading = false;
          this.username = data.username;
        });
      },

      editUser() {
        const username = this.username;
        const password = this.password;

        if(username != '') {
          this.$http.patch(`${config.api}/change-userdata`, {username, password}).then(value => {
            this.success = true;
            this.clearSuccessMessage();
          });
        }
      },

      clearSuccessMessage() {
        setTimeout(() => {
          this.success = false;
        }, 2000);
      }
    }
  }
</script>