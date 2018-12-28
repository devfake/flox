<template>
  <main>
    <div class="content-submenu" v-if=" ! loading && auth">
      <div class="sort-wrap no-select">
        <div class="filter-wrap">
          <span class="current-filter" @click="openList()">New List</span>
        </div>
      </div>
    </div>

    <div class="wrap-content" v-if=" ! loading">
      <transition-group mode="out-in" name="fade">
        <!-- Watchlist -->
        <router-link key="watchlist" to="/watchlist" class="list-item-wrap">
          <div class="list-item-teaser-image" style="background-image: url(https://flox.test/assets/backdrop/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg)"></div>
          <span class="list-item-title">Watchlist</span>
          <span class="list-item-amount">12 Items</span>
        </router-link>
        
        <router-link to="/" class="list-item-wrap" :key="list.id" v-for="list in lists">
          <span class="edit-list" v-if="auth" @click.prevent="openList(list)"><i class="icon-edit"></i></span>
          <div class="list-item-teaser-image" :style="backdropImage(list.latest_backdrop)"></div>
          <span class="list-item-title">{{ list.name }}</span>
          <span class="list-item-amount">{{ list.items_count }} Items</span>
        </router-link>
        
      </transition-group>
    </div>

    <span class="loader fullsize-loader" v-if="loading"><i></i></span>
  </main>
</template>

<script>
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
        auth: config.auth,
        displayGenre: null,
        displayDate: null,
        displayRatings: null,
      }
    },

    computed: {
      ...mapState({
        loading: state => state.loading,
        lists: state => state.lists,
      })
    },

    methods: {
      ...mapMutations([ 'OPEN_MODAL' ]),
      ...mapActions([ 'loadLists', 'setSearchTitle', 'setPageTitle' ]),

      fetchData() {
        let name = this.$route.name;

        this.setTitle(name);
        this.loadLists();
        this.setSearchTitle('');
      },

      openList(list = null) {
        this.OPEN_MODAL({
          type: 'list',
          data: {
            list
          }
        });
      },

      backdropImage(latestBackdrop) {
        let backdropUrl = config.backdropTMDB;
        
        if (!latestBackdrop) {
          return {}
        }
        
        return {
          backgroundImage: `url(${backdropUrl}${latestBackdrop})`
        }
      },

      setTitle(name) {
        return this.setPageTitle(this.lang(name));
      },

      fetchSettings() {
        http(`${config.api}/settings`).then(value => {
          const data = value.data;

          this.displayGenre = data.genre;
          this.displayDate = data.date;
          this.displayRatings = data.ratings;
        });
      }
    },

    watch: {
      $route() {
        this.fetchData();
      }
    }
  }
</script>
