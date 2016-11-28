<template>
  <main>
    <div class="wrap-content" v-if=" ! loading">
      <Item v-for="(item, index) in items"
            :item="item"
            :key="index"
            :genre="true"
            :date="true"
      ></Item>
    </div>

    <span class="loader fullsize-loader" v-if="loading"><i></i></span>
  </main>
</template>

<script>
  import Item from './Item.vue';
  import Helper from '../../helper';

  import http from 'axios';

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
        const type = this.$route.query.type;

        http(`${config.api}/suggestions/${tmdbID}/${type}`).then(value => {
          this.items = value.data;
          this.SET_LOADING(false);
        });
      },

      initTrending() {
        http(`${config.api}/trending`).then(value => {
          this.items = value.data;
          this.SET_LOADING(false);
        });
      },

      initUpcoming() {
        http(`${config.api}/upcoming`).then(value => {
          this.items = value.data;
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