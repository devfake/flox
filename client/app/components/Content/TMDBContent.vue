<template>
  <main :class="{'display-suggestions': path === 'suggestions'}">
    <div class="wrap-content" v-if=" ! loading">
      <div class="items-wrap">
        <Item v-for="(item, index) in items"
              :item="item"
              :key="index"
              :genre="true"
              :date="true"
              :ratings="displayRatings"
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
      this.fetchSettings();
      this.init();
    },

    data() {
      return {
        items: [],
        path: '',
        displayRatings: null
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
          case 'suggestions':
            return this.initSuggestions();
          case 'trending':
          case 'upcoming':
          case 'now-playing':
            return this.initContent(this.path);
        }
      },

      initSuggestions() {
        const tmdbID = this.$route.query.for;
        const type = this.$route.query.type;

        this.setPageTitle(this.lang('suggestions for') + ' ' + this.$route.query.name);

        http(`${config.api}/suggestions/${tmdbID}/${type}`).then(response => {
          this.items = response.data;
          this.SET_LOADING(false);
        });
      },

      initContent(path) {
        this.setPageTitle(this.lang(path));

        http(`${config.api}/${path}`).then(response => {
          this.items = response.data;
          this.SET_LOADING(false);
        });
      },

      fetchSettings() {
        http(`${config.api}/settings`).then(value => {
          this.displayRatings = value.data.ratings;
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
