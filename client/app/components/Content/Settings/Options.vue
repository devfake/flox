<template>

  <div class="settings-box no-select" v-if=" ! loading">
    <div class="checkbox">
      <input type="checkbox" value="genre" v-model="genre" id="genre" @change="updateOptions"><label for="genre">{{ lang('display genre') }}</label>
    </div>
    <div class="checkbox">
      <input type="checkbox" value="date" v-model="date" id="date" @change="updateOptions"><label for="date">{{ lang('display date') }}</label>
    </div>
    <div class="checkbox">
      <input type="checkbox" value="spoiler" v-model="spoiler" id="spoiler" @change="updateOptions"><label for="spoiler">{{ lang('spoiler') }}</label>
    </div>
  </div>

</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import Helper from '../../../helper';

  import http from 'axios';
  import debounce from 'debounce';

  const debounceMilliseconds = 700;

  export default {
    mixins: [Helper],

    created() {
      this.fetchOptions();
      this.updateOptions = debounce(this.updateOptions, debounceMilliseconds);
    },

    data() {
      return {
        genre: null,
        date: null,
        spoiler: null,
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
        });
      },

      updateOptions() {
        const date = this.date;
        const genre = this.genre;
        const spoiler = this.spoiler;

        http.patch(`${config.api}/settings`, {date, genre, spoiler}).catch(() => {
          alert('Error');
        });
      },
    }

  }
</script>