<template>
  <main :class="{'display-suggestions': path == 'suggestions'}">
    <div class="wrap-content" v-if=" ! loading">
      <div class="items-wrap">
        <Item v-for="(item, index) in items"
              :item="item"
              :key="index"
              :genre="true"
              :date="true"
        ></Item>
      </div>
    </div>

    <span class="loader fullsize-loader" v-if="loading"><i></i></span>
  </main>
</template>

<script>
  import Item from './Item.vue';
  import MiscHelper from '../../helpers/misc';

  import http from 'axios';

  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    mixins: [MiscHelper],

    created() {
      this.init();
    },

    data() {
      return {
        items: [],
        path: ''
      }
    },

    computed: {
      ...mapState({
        loading: state => state.loading
      })
    },

    methods: {
      ...mapMutations([ 'SET_LOADING' ]),
      ...mapActions([ 'setPageTitle' ]),

      init() {
        this.SET_LOADING(true);
        this.path = this.$route.name;

        switch(this.path) {
          case 'trending':
            return this.initTrending();
          case 'suggestions':
            return this.initSuggestions();
          case 'upcoming':
            return this.initUpcoming();
        }
      },

      initSuggestions() {
        const tmdbID = this.$route.query.for;
        const type = this.$route.query.type;

        this.setPageTitle(this.lang('suggestions for') + ' ' + this.$route.query.name);

        http(`${config.api}/suggestions/${tmdbID}/${type}`).then(value => {
          this.items = value.data;
          this.SET_LOADING(false);
        });
      },

      initTrending() {
        this.setPageTitle(this.lang('trending'));

        http(`${config.api}/trending`).then(value => {
          this.items = value.data;
          this.SET_LOADING(false);
        });
      },

      initUpcoming() {
        this.setPageTitle(this.lang('upcoming'));

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