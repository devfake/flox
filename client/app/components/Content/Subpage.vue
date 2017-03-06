<template>
  <main>
    <!-- todo: make header position absolute, and float teaser and content correct -->
    <section class="big-teaser-wrap" :class="{active: itemLoadedSubpage}" v-show=" ! loading">

      <div class="big-teaser-image"  :style="backdropImage"></div>

      <div class="wrap">
        <div class="big-teaser-content">
          <div class="big-teaser-data-wrap">
            <div class="big-teaser-item-data">
              <span class="item-year">2016</span>
              <span class="item-title">{{ item.title }}</span>
              <span class="item-genre">{{ item.genre }}</span>
            </div>
            <div class="big-teaser-buttons no-select">
              <a v-if="item.trailer_src" :href="item.trailer_src" target="_blank" class="button-trailer"><i class="icon-trailer"></i> Watch trailer</a>
              <span v-if="item.rating == null && auth" class="button-watchlist"><i class="icon-watchlist"></i> Add to watchlist</span>
              <a :href="`https://www.themoviedb.org/${item.media_type}/${item.tmdb_id}`" target="_blank" class="button-tmdb-rating">
                <i v-if="item.tmdb_rating != 0"><b>{{ item.tmdb_rating }}</b> TMDb</i>
                <i v-else>No TMDb Rating</i>
              </a>
              <a v-if="item.imdb_id" :href="`http://www.imdb.com/title/${item.imdb_id}`" target="_blank" class="button-imdb-rating">
                <i v-if="loadingImdb">Loading IMDb Rating...</i>
                <i v-if="item.imdb_rating && ! loadingImdb"><b>{{ item.imdb_rating }}</b> IMDb</i>
                <i v-if=" ! item.imdb_rating && ! loadingImdb">No IMDb Rating</i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="subpage-content" v-show=" ! loading">
      <div class="wrap">
        <div class="subpage-sidebar">
          <div class="subpage-poster-wrap">
            <rating :item="item" :set-item="setItem"></rating>
            <img class="real" :src="posterImage" width="272" height="408">
            <img class="base" width="272" height="408">
          </div>

          <div class="subpage-sidebar-buttons">
            <!--span class="remove-item" v-if="item.rating != null && auth" @click="removeItem()">{{ lang('delete movie') }}</span-->
          </div>
        </div>
        <div class="subpage-overview">
          <h2>Overview</h2>
          <p>{{ overview }}</p>
        </div>
      </div>
    </div>

    <span class="loader fullsize-loader" v-show="loading"><i></i></span>
  </main>
</template>

<script>
  import Rating from '../Rating.vue';
  import { mapMutations, mapState } from 'vuex'
  import Helper from '../../helper';

  import http from 'axios';

  export default {
    mixins: [Helper],

    props: ['mediaType'],

    created() {
      document.body.classList.add('subpage-open');
      // todo: replace with transitions? after fetchdata?
      this.scrollToTop();
      this.fetchData();
    },

    destroyed() {
      document.body.classList.remove('subpage-open');
      this.SET_ITEM_LOADED_SUBPAGE(false);
    },

    data() {
      return {
        item: {},
        loadingImdb: false,
        auth: config.auth
      }
    },

    computed: {
      ...mapState({
        loading: state => state.loading,
        itemLoadedSubpage: state => state.itemLoadedSubpage
      }),

      overview() {
        return this.item.overview ? this.item.overview : '-';
      },

      backdropImage() {
        let backdropUrl = config.backdropTMDB;

        if(this.item.rating != null) {
          backdropUrl = config.backdrop;
        }

        return {
          backgroundImage: `url(${backdropUrl}${this.item.backdrop})`
        }
      },

      posterImage() {
        if(this.item.rating != null) {
          return config.posterSubpage + this.item.poster;
        }

        return config.posterSubpageTMDB + this.item.poster;
      }
    },

    methods: {
      ...mapMutations([ 'SET_LOADING', 'SET_ITEM_LOADED_SUBPAGE' ]),

      fetchImdbRating() {
        if(this.item.imdb_id && this.item.imdb_rating == null) {
          this.loadingImdb = true;

          http(`${config.api}/imdb-rating/${this.item.imdb_id}`).then(response => {
            this.$set(this.item, 'imdb_rating', response.data);
            this.loadingImdb = false;
          }, error => {
            //
            console.log(error);
            this.loadingImdb = false;
          });
        }
      },

      fetchData() {
        const tmdbId = this.$route.params.tmdbId;

        this.SET_LOADING(true);
        http(`${config.api}/item/${tmdbId}/${this.mediaType}`).then(response => {
          this.item = response.data;
          this.disableLoading();
          this.fetchImdbRating();
        }, error => {
          this.SET_LOADING(false);
          console.log(error);
        });
      },

      disableLoading() {
        setTimeout(() => {
          this.SET_LOADING(false);
          this.displayItem();
        }, 300);
      },

      displayItem() {
        setTimeout(() => {
          this.SET_ITEM_LOADED_SUBPAGE(true);
          //this.itemLoadedSubpage = true;
        }, 100);
      },

      setItem(item) {
        this.item = item;
      },

      removeItem() {
        if(this.auth) {
          const confirm = window.confirm(this.lang('confirm delete'));

          if(confirm) {
            http.delete(`${config.api}/remove/${this.item.id}`).then(response => {
              this.item.rating = null;
            }, error => {
              alert('Error in removeItem()');
            });
          }
        }
      }
    },

    components: {
      Rating
    },

    watch: {
      $route() {

      }
    }
  }
</script>