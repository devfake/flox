<template>
  <main>
    <div class="wrap-content" v-if=" ! loading">
      <Item v-for="(item, index) in items" :item="item" :key="index"></Item>
    </div>

    <span class="loader fullsize-loader" v-if="loading"><i></i></span>
  </main>
</template>

<script>
  import Item from './Item.vue';
  import Helper from '../../helper';

  import { mapState, mapMutations } from 'vuex'

  export default {
    mixins: [Helper],

    created() {
      this.init();
    },

    data() {
      return {
        items: []
      }
    },

    computed: {
      ...mapState({
        loading: state => state.loading
      })
    },

    methods: {
      ...mapMutations([ 'SET_LOADING' ]),

      init() {
        this.SET_LOADING(true);
        const path = this.$route.path;

        if(path == '/trending') {
          this.initTrending();
        } else if(path == '/suggestions') {
          this.initSuggestions();
        } else if(path == '/upcoming') {
          this.initUpcoming();
        }
      },

      initSuggestions() {
        const tmdbID = this.$route.query.for;

        this.$http.get(`${config.api}/suggestions/${tmdbID}`).then(value => {
          this.items = value.body;
          this.SET_LOADING(false);
        });
      },

      initTrending() {
        this.$http.get(`${config.api}/trending`).then(value => {
          this.items = value.body;
          this.SET_LOADING(false);
        });
      },

      initUpcoming() {
        this.$http.get(`${config.api}/upcoming`).then(value => {
          this.items = value.body;
          this.SET_LOADING(false);
        });
      }
    },

    components: {
      Item
    },

    watch: {
      $route() {
        this.scrollToTop();
        this.init();
      }
    }
  }
</script>