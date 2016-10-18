<template>
  <main>
    <div class="wrap-content" v-if=" ! loading">
      <Item :item="item" v-for="(item, index) in items"
            :key="index"
            :genre="displayGenre"
            :date="displayDate"
      ></Item>

      <span class="nothing-found" v-if=" ! items.length">No Movies Found</span>

      <div class="load-more-wrap">
        <span class="load-more" v-if=" ! clickedMoreLoading && paginator" @click="loadMore()">Load More</span>
        <span class="loader" v-if="clickedMoreLoading"><i></i></span>
      </div>
    </div>

    <span class="loader fullsize-loader" v-if="loading"><i></i></span>
  </main>
</template>

<script>
  import Item from './Item.vue';
  import { mapActions, mapState } from 'vuex'

  export default {
    created() {
      this.fetchData();
      this.fetchSettings();
    },

    data() {
      return {
        displayGenre: null,
        displayDate: null
      }
    },

    computed: {
      ...mapState({
        loading: state => state.loading,
        items: state => state.items,
        userFilter: state => state.userFilter,
        clickedMoreLoading: state => state.clickedMoreLoading,
        paginator: state => state.paginator
      })
    },

    methods: {
      ...mapActions([ 'loadItems', 'loadMoreItems', 'setSearchTitle' ]),

      fetchData() {
        this.loadItems(this.userFilter);
        this.setSearchTitle('');
      },

      fetchSettings() {
        this.$http.get(`${config.api}/settings`).then(value => {
          const data = value.body;

          this.displayGenre = data.genre;
          this.displayDate = data.date;
        });
      },

      loadMore() {
        this.loadMoreItems(this.paginator);
      }
    },

    components: {
      Item
    },

    watch: {
      $route() {
        this.fetchData();
      }
    }
  }
</script>