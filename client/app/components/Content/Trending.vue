<template>
  <main>
    <div class="wrap-content" v-if=" ! loading">
      <Item v-for="(item, index) in trendingItems" :item="item" :key="index"></Item>
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
      this.initTrending();
    },

    data() {
      return {
        trendingItems: []
      }
    },

    computed: {
      ...mapState({
        loading: state => state.loading
      })
    },

    methods: {
      ...mapMutations([ 'SET_LOADING' ]),

      initTrending() {
        this.SET_LOADING(true);

        this.$http.get(`${config.api}/trending`).then(value => {
          this.trendingItems = value.body;
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
        this.initTrending();
      }
    }
  }
</script>