<template>
  <main>
    <div class="wrap-content" v-if=" ! loading">
      <span class="nothing-found">Settings coming soon...</span>
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
        username: ''
      }
    },

    methods: {
      fetchUserData() {
        setTimeout(() => {
          this.loading = false;
        }, 800);
      }
    }
  }
</script>