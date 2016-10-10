<template>
  <main>
    <div class="wrap-content" v-if=" ! loading">
      <span class="nothing-found">Settings</span>
      <div class="user-settings-box">
        <form class="login-form" @submit.prevent="editUser('username')">
          <input type="text" placeholder="Username" v-model="username">
          <span class="userdata-changed"><span v-if="usernameSuccess">Username changed</span></span>
          <input type="submit" value="Change username">
        </form>
      </div>
      <div class="user-settings-box">
        <form class="login-form" @submit.prevent="editUser('password')">
          <input type="password" placeholder="Password" v-model="password" autocomplete="off">
          <span class="userdata-changed"><span v-if="passwordSuccess">Password changed</span></span>
          <input type="submit" value="Change password">
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
        usernameSuccess: false,
        passwordSuccess: false
      }
    },

    methods: {
      fetchUserData() {
        this.$http.get(`${config.api}/userdata`).then(value => {
          const data = value.body;
          this.loading = false;
          this.username = data.username;
        });
      },

      editUser(type) {
        if((type == 'username' && this.username != '') || (type == 'password' && this.password != '')) {
          const username = this.username;
          const password = this.password;

          this.$http.post(`${config.api}/change-${type}`, {username, password}).then(value => {
            this.showSuccessMessage(type);
            this.clearSuccessMessage(type);

            console.log(value);
          }, error => {
            console.log(error);
          });
        }
      },

      showSuccessMessage(type) {
        if(type == 'username') {
          this.usernameSuccess = true;
        } else {
          this.passwordSuccess = true;
        }
      },

      clearSuccessMessage(type) {
        setTimeout(() => {
          if(type == 'username') {
            this.usernameSuccess = false;
          } else {
            this.passwordSuccess = false;
          }
        }, 2000);
      }
    }
  }
</script>