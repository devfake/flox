<template>

  <div class="settings-box no-select" v-if=" ! loading">
    <div class="setting-box">
      <input type="checkbox" value="genre" v-model="genre" id="genre" @change="updateOptions"><label for="genre">{{ lang('display genre') }}</label>
    </div>
    <div class="setting-box">
      <input type="checkbox" value="date" v-model="date" id="date" @change="updateOptions"><label for="date">{{ lang('display date') }}</label>
    </div>
    <div class="setting-box">
      <input type="checkbox" value="spoiler" v-model="spoiler" id="spoiler" @change="updateOptions"><label for="spoiler">{{ lang('spoiler') }}</label>
    </div>
    <div class="setting-box">
      <input type="checkbox" value="watchlist" v-model="watchlist" id="watchlist" @change="updateOptions"><label for="watchlist">{{ lang('show watchlist') }}</label>
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
        genre: null,
        date: null,
        spoiler: null,
        watchlist: null
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
          const data = response.data;

          this.SET_LOADING(false);
          this.genre = data.genre;
          this.date = data.date;
          this.spoiler = data.spoiler;
          this.watchlist = data.watchlist;
        });
      },

      updateOptions() {
        this.SET_LOADING(true);

        const date = this.date;
        const genre = this.genre;
        const spoiler = this.spoiler;
        const watchlist = this.watchlist;

        http.patch(`${config.api}/settings`, {date, genre, spoiler, watchlist}).then(response => {
          this.SET_LOADING(false);
        }, error => {
          alert(error.message);
        })
      },
    }

  }
</script>