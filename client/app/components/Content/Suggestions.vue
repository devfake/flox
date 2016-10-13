<template>
  <main>
    <div class="wrap-content" v-if=" ! loading">
      <Item v-for="(item, index) in suggestItems" :item="item" :key="index"></Item>
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
      this.initSuggestions();
    },

    data() {
      return {
        suggestItems: []
      }
    },

    computed: {
      ...mapState({
        loading: state => state.loading
      })
    },

    methods: {
      ...mapMutations([ 'SET_LOADING' ]),

      initSuggestions() {
        this.SET_LOADING(true);
        const tmdbID = this.$route.query.for;

        this.$http.get(`${config.api}/suggestions/${tmdbID}`).then(value => {
          this.suggestItems = value.body;
          this.SET_LOADING(false);
        })
      }
    },

    components: {
      Item
    },

    watch: {
      $route() {
        this.scrollToTop();
        this.initSuggestions();
      }
    }
  }
</script>