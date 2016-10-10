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
        success: false
      }
    },

    computed: {
      exportLink() {
        return config.api + '/export';
      }
    },

    methods: {
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