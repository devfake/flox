<template>

  <div class="settings-box" v-if=" ! loading">
    <div class="login-error" v-if="config.env === 'demo'"><span>Data cannot be changed in the demo</span></div>

    <a :href="exportLink" class="setting-btn">{{ lang('export button') }}</a>

    <form class="login-form" @submit.prevent="importMovies()">
      <span class="import-info">{{ lang('or divider') }}</span>
      <input type="file" @change="upload" class="file-btn" required>
      <span class="userdata-changed"><span v-if="uploadSuccess">{{ lang('success import') }}</span></span>
      <input type="submit" :value="lang('import button')">
    </form>
  </div>

</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import MiscHelper from '../../../helpers/misc';

  import http from 'axios';

  export default {
    mixins: [MiscHelper],

    data() {
      return {
        config: window.config,
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

      importMovies() {
        if(this.uploadedFile) {
          const confirm = window.confirm(this.lang('import warn'));

          if(confirm) {
            this.SET_LOADING(true);

            http.post(`${config.api}/import`, this.uploadedFile).then(() => {
              this.SET_LOADING(false);
              this.uploadSuccess = true;
            }, error => {
              this.SET_LOADING(false);
              alert('Error: ' + error.response.data);
            });
          }
        }
      }
    }

  }
</script>
