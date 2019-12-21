<template>
  <transition mode="out-in" name="fade">
    <div class="item-wrap" :class="'show-ratings-' + ratings">
      <div class="item-image-wrap no-select">
        <rating :rated="rated" :set-rated="setRated" :item="localItem" :set-item="setItem"></rating>

        <div class="item-actions">
          <router-link :title="lang('suggestions')" :to="suggestionsUri(localItem)" v-if="localItem.tmdb_id" class="has-suggestion">
            <i class="icon-suggest"></i>
          </router-link>
          <span :title="lang('add to list')" class="is-on-watchlist" v-if="auth" @click="openListModal(localItem)"><i class="icon-watchlist"></i></span>
          <span :title="lang('episodes')" v-if="displaySeason(localItem) && latestEpisode" @click="openSeasonModal(localItem)" class="is-a-show">
            S{{ season }}E{{ episode }}
          </span>
          <span :title="lang('episodes')" v-if="displaySeason(localItem) && !latestEpisode" @click="openSeasonModal(localItem)" class="is-a-show">
            <i class="is-finished"></i>
          </span>
        </div>

        <span v-if="auth && ! localItem.tmdb_id" class="edit-item" @click="editItem()">Edit</span>

        <router-link :to="{ name: `subpage-${localItem.media_type}`, params: { tmdbId: localItem.tmdb_id, slug: localItem.slug }}">
          <img v-if="localItem.poster" :src="poster" class="item-image" width="185" height="278">
          <img v-if=" ! localItem.poster" :src="noImage" class="item-image" width="185" height="278">
        </router-link>
      </div>

      <div class="item-content">
        <span v-if="date == 1" class="item-year">{{ released }} <i>{{ lang(localItem.media_type) }}</i></span>
        <router-link :to="{ name: `subpage-${localItem.media_type}`, params: { tmdbId: localItem.tmdb_id }}" class="item-title" :title="localItem.title">
          <i class="item-has-src" v-if="hasSrc"></i>
          {{ localItem.title }}
        </router-link>
        <span v-if="genre == 1" class="item-genre">{{ genreAsString(localItem.genre) }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
  import Rating from '../Rating.vue';

  import http from 'axios';
  import MiscHelper from '../../helpers/misc';
  import ItemHelper from '../../helpers/item';

  import { mapMutations, mapActions } from 'vuex';

  export default {
    mixins: [MiscHelper, ItemHelper],

    props: ['item', 'genre', 'date', 'ratings'],

    data() {
      return {
        localItem: this.item,
        latestEpisode: this.item.latest_episode,
        prevRating: null,
        auth: config.auth,
        rated: false
      }
    },

    computed: {
      hasSrc() {
        return this.localItem.src || this.localItem.episodes_with_src_count > 0;
      },

      poster() {
        if(this.localItem.rating) {
          return config.poster + this.localItem.poster;
        }

        return config.posterTMDB + this.localItem.poster;
      },

      noImage() {
        return config.url + '/assets/img/no-image.png';
      },

      released() {
        const path = this.$route.path;
        const released = new Date(this.localItem.released * 1000);

        if(path === '/upcoming' || path === '/now-playing') {
          return this.formatLocaleDate(released);
        }

        return released.getFullYear();
      }
    },

    methods: {
      ...mapMutations([ 'OPEN_MODAL', 'SET_RATED' ]),
      ...mapActions([ 'fetchEpisodes' ]),

      setItem(item) {
        this.localItem = item;
      },

      setRated(rated) {
        this.rated = rated
      },

      removeItem() {
        this.rated = true;

        http.delete(`${config.api}/remove/${this.localItem.id}`).then(response => {
          this.rated = false;
          this.localItem.rating = null;
          this.localItem.watchlist = null;
        }, error => {
          alert(error);
          this.rated = false;
        });
      },

      editItem() {

      }
    },

    components: {
      Rating
    }
  }
</script>
