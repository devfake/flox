<template>
  <main>
    <div class="content-submenu" v-if=" ! loading && items.length">
      <div class="sort-wrap no-select">
        <el-checkbox class="hide-completed" v-show="$route.name === 'tv'" v-model="userHideCompleted" @change="updateHideCompleted">{{ lang('hide completed') }}</el-checkbox>
        <div class="sort-direction" @click="setUserSortDirection()">
          <i v-if="userSortDirection == 'asc'">&#8593;</i>
          <i v-if="userSortDirection == 'desc'">&#8595;</i>
        </div>
        <div class="filter-wrap">
          <span class="current-filter" @click="toggleShowFilters()">{{ lang(userFilter) }} <span class="arrow-down"></span></span>
          <ul class="all-filters" :class="{active: showFilters}">
            <li v-if="filter !== userFilter" v-for="filter in filters" @click="setUserFilter(filter)">{{ lang(filter) }}</li>
          </ul>
        </div>
      </div>
    </div>

      <div class="wrap-content" v-if=" ! loading">
      <Item :item="item" v-for="(item, index) in items"
            :key="index"
            :genre="displayGenre"
            :date="displayDate"
            :ratings="displayRatings"
      ></Item>

      <span class="nothing-found" v-if=" ! items.length">{{ lang('nothing found') }}</span>

      <div class="load-more-wrap">
        <span class="load-more" v-if=" ! clickedMoreLoading && paginator" @click="loadMore()">{{ lang('load more') }}</span>
        <span class="loader" v-if="clickedMoreLoading"><i></i></span>
      </div>
    </div>

    <span class="loader fullsize-loader" v-if="loading"><i></i></span>
  </main>
</template>

<script>
  import Item from './Item.vue';
  import { mapActions, mapState, mapMutations } from 'vuex'
  import MiscHelper from '../../helpers/misc';

  import http from 'axios';

  export default {
    mixins: [MiscHelper],

    created() {
      this.fetchData();
      this.fetchSettings();
    },

    data() {
      return {
        displayGenre: null,
        displayDate: null,
        displayRatings: null,
      }
    },

    computed: {
      ...mapState({
        filters: state => state.filters,
        showFilters: state => state.showFilters,
        loading: state => state.loading,
        items: state => state.items,
        userFilter: state => state.userFilter,
        userSortDirection: state => state.userSortDirection,
        clickedMoreLoading: state => state.clickedMoreLoading,
        paginator: state => state.paginator,
        userHideCompleted: state => state.userHideCompleted,
      })
    },

    methods: {
      ...mapActions([ 'loadItems', 'loadMoreItems', 'setSearchTitle', 'setPageTitle' ]),
      ...mapMutations([ 'SET_USER_FILTER', 'SET_SHOW_FILTERS', 'SET_USER_SORT_DIRECTION', 'SET_USER_HIDE_COMPLETED' ]),

      fetchData() {
        let name = this.$route.name;

        this.setTitle(name);
        this.loadItems({name});
        this.setSearchTitle('');
      },

      setTitle(name) {
        switch(name) {
          case 'home':
            return this.setPageTitle();
          case 'tv':
          case 'movie':
          case 'watchlist':
            return this.setPageTitle(this.lang(name));
        }
      },

      fetchSettings() {
        http(`${config.api}/settings`).then(value => {
          const data = value.data;

          this.displayGenre = data.genre;
          this.displayDate = data.date;
          this.displayRatings = data.ratings;
        });
      },

      loadMore() {
        this.loadMoreItems(this.paginator);
      },

      toggleShowFilters() {
        this.SET_SHOW_FILTERS( ! this.showFilters);
      },

      updateHideCompleted() {
        let changed = ! this.userHideCompleted;
        localStorage.setItem('hide-completed', `${changed}`);
        this.SET_USER_HIDE_COMPLETED(changed);
        this.fetchData();
      },

      setUserFilter(filter) {
        this.SET_SHOW_FILTERS(false);

        localStorage.setItem('filter', filter);
        this.SET_USER_FILTER(filter);
        this.fetchData();
      },

      setUserSortDirection() {
        let newSort = this.userSortDirection === 'asc' ? 'desc' : 'asc';

        localStorage.setItem('sort-direction', newSort);
        this.SET_USER_SORT_DIRECTION(newSort);
        this.fetchData();
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
