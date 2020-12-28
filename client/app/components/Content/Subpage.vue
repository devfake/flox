<template>
  <main>
    <div class="bigsize-header">
      <section class="big-teaser-wrap" :class="{active: itemLoadedSubpage}" v-show=" ! loading">

        <div class="big-teaser-image" :style="backdropImage"></div>

        <div class="wrap">
          <div class="big-teaser-content">
            <div class="big-teaser-data-wrap">

              <div class="subpage-poster-wrap-mobile no-select" :class="'show-ratings-' + displayRatings">
                <div class="item-actions">
                  <router-link :title="lang('suggestions')" :to="suggestionsUri(item)" v-if="item.tmdb_id"
                               class="has-suggestion">
                    <i class="icon-suggest"></i>
                  </router-link>
                  <span class="is-on-watchlist" :title="lang('add to watchlist')"
                        v-if="item.rating == null && auth && ! rated" @click="addToWatchlist(item)">
                    <i class="icon-watchlist"></i>
                  </span>
                      <span class="is-on-watchlist" :title="lang('remove from watchlist')"
                            v-if="item.watchlist && auth && ! rated" @click="removeItem()">
                    <i class="icon-watchlist-remove"></i>
                  </span>
                      <span :title="lang('episodes')" v-if="displaySeason(item) && latestEpisode"
                            @click="openSeasonModal(item)"
                            class="is-a-show">
                    S{{ season }}E{{ episode }}
                  </span>
                      <span :title="lang('finished')" v-if="displaySeason(item) && !latestEpisode"
                            @click="openSeasonModal(item)" class="is-a-show">
                    <i class="is-finished"></i>
                  </span>
                </div>

                <rating :rated="rated" :item="item" :set-item="setItem" :set-rated="setRated"></rating>
                <img class="base" :src="noImage" width="140" height="200">
                <img class="real" :src="posterImage" width="140" height="200">
              </div>

              <!-- todo: move to own component -->
              <div class="big-teaser-item-data">
                <span class="item-year">{{ item.release }}</span>
                <span class="item-title">{{ item.show_title }}</span>
                <span class="item-genre">
                  <router-link :key="genre.id" :to="'/genre/' + genre.name"
                               v-for="genre in item.genre">{{ genre.name }}</router-link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="subpage-content" :class="{active: itemLoadedSubpage}" v-show=" ! loading">
      <div class="wrap">
        <div class="subpage-overview">
          <h2>{{ lang('overview') }}</h2>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>

        <div class="subpage-sidebar">
          <div class="subpage-poster-wrap no-select" :class="'show-ratings-' + displayRatings">
            <div class="item-actions">
              <router-link :title="lang('suggestions')" :to="suggestionsUri(item)" v-if="item.tmdb_id"
                           class="has-suggestion">
                <i class="icon-suggest"></i>
              </router-link>
              <span class="is-on-watchlist" :title="lang('add to watchlist')"
                    v-if="item.rating == null && auth && ! rated" @click="addToWatchlist(item)">
                <i class="icon-watchlist"></i>
              </span>
              <span class="is-on-watchlist" :title="lang('remove from watchlist')"
                    v-if="item.watchlist && auth && ! rated" @click="removeItem()">
                <i class="icon-watchlist-remove"></i>
              </span>
              <span :title="lang('episodes')" v-if="displaySeason(item) && latestEpisode" @click="openSeasonModal(item)"
                    class="is-a-show">
                S{{ season }}E{{ episode }}
              </span>
              <span :title="lang('finished')" v-if="displaySeason(item) && !latestEpisode"
                    @click="openSeasonModal(item)" class="is-a-show">
                <i class="is-finished"></i>
              </span>
            </div>

            <rating :rated="rated" :item="item" :set-item="setItem" :set-rated="setRated"></rating>
            <img class="base" :src="noImage" width="272" height="408">
            <img class="real" :src="posterImage" width="272" height="408">

            <!--            <router-link v-if="item.tmdb_id" :to="suggestionsUri(item)" class="recommend-item">{{ lang('suggestions') }}</router-link>-->
            <!--            <span class="show-episode" @click="openSeasonModal(item)" v-if="displaySeason(item)">-->
            <!--              <span class="season-item"><i>S</i>{{ season }}</span>-->
            <!--              <span class="episode-item"><i>E</i>{{ episode }}</span>-->
            <!--            </span>-->
          </div>

          <!-- todo: move to own component -->
          <div class="subpage-sidebar-buttons no-select" v-if="item.rating != null && auth">
            <span class="refresh-infos" @click="refreshInfos()">{{ lang('refresh infos') }}</span>
            <span class="remove-item" @click="removeItem()" v-if=" ! item.watchlist">{{ lang('delete item') }}</span>
          </div>
        </div>
      </div>
    </div>

    <span class="loader fullsize-loader" v-show="loading"><i></i></span>
  </main>
</template>

<script>
  import Rating from '../Rating.vue';
  import {mapActions, mapMutations, mapState} from 'vuex'
  import MiscHelper from '../../helpers/misc';
  import ItemHelper from '../../helpers/item';

  import http from 'axios';

  export default {
    mixins: [MiscHelper, ItemHelper],

    props: ['slug','id'],

    created() {
      document.body.classList.add('subpage-open');
      window.scrollTo(0, 0);
      this.fetchSettings();
      this.fetchData();
    },

    destroyed() {
      document.body.classList.remove('subpage-open');
      this.SET_ITEM_LOADED_SUBPAGE(false);
      this.CLOSE_MODAL();
    },

    data() {
      return {
        item: {},
        latestEpisode: null,
        loadingImdb: false,
        auth: config.auth,
        rated: false,
        displayRatings: null
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

        if (this.item.rating != null) {
          backdropUrl = config.backdrop;
        }

        return {
          backgroundImage: `url(${backdropUrl}${this.item.backdrop})`
        }
      },

      posterImage() {
        if (!this.item.poster) {
          return this.noImage;
        }

        return "/assets/" + this.item.poster;
      },

      noImage() {
        return config.url + '/assets/img/no-image-subpage.png';
      },

      released() {
        const released = new Date(this.item.released * 1000);

        return released.getFullYear();
      },
    },

    methods: {
      ...mapMutations(['SET_LOADING', 'SET_ITEM_LOADED_SUBPAGE', 'OPEN_MODAL', 'CLOSE_MODAL', 'SET_RATED']),
      ...mapActions(['setPageTitle', 'fetchEpisodes']),

      openTrailer() {
        this.OPEN_MODAL({
          type: 'trailer',
          data: {
            youtubeKey: this.item.youtube_key,
            title: this.item.title
          }
        });
      },

      fetchImdbRating() {
        if (this.item.imdb_id && this.item.rating == null) {
          this.loadingImdb = true;

          http(`${config.api}/imdb-rating/${this.item.imdb_id}`).then(response => {
            const rating = this.intToFloat(response.data);

            this.$set(this.item, 'imdb_rating', rating);
            this.loadingImdb = false;
          }, error => {
            alert(error);
            this.loadingImdb = false;
          });
        }
      },

      fetchSettings() {
        http(`${config.api}/settings`).then(value => {
          this.displayRatings = value.data.ratings;
        });
      },

      fetchData() {

        this.SET_LOADING(true);
        http(`${config.api}/item/${this.id}`).then(response => {
          this.item = response.data;
          this.latestEpisode = this.item.latest_episode;

          this.setPageTitle(this.item.show_title);

          this.disableLoading();
          this.fetchImdbRating();
        }, error => {
          console.log(error);
          this.SET_LOADING(false);
          this.$router.push('/');
        });
      },

      disableLoading() {
        setTimeout(() => {
          this.SET_LOADING(false);
          this.displayItem();
        }, 100);
      },

      displayItem() {
        setTimeout(() => {
          this.SET_ITEM_LOADED_SUBPAGE(true);
        }, 50);
      },

      setItem(item) {
        this.item = item;
      },

      setRated(rated) {
        this.rated = rated;
      },

      removeItem() {
        this.rated = true;

        http.delete(`${config.api}/remove/${this.item.id}`).then(response => {
          this.rated = false;
          this.item.rating = null;
          this.item.watchlist = null;
        }, error => {
          alert(error);
          this.rated = false;
        });
      },

      refreshInfos() {
        this.SET_LOADING(true);
        this.SET_ITEM_LOADED_SUBPAGE(false);

        http.patch(`${config.api}/refresh/${this.item.id}`).then(response => {
          location.reload();
        }, error => {
          alert(error);
          this.SET_LOADING(false);
        })
      }
    },

    components: {
      Rating
    }
  }
</script>
